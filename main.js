process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js' 
import './plugins/_mdmx.js'
import { createRequire } from 'module'
import path, { join } from 'path'
import {fileURLToPath, pathToFileURL} from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { watchFile, unwatchFile, writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { format } from 'util'
import pino from 'pino'
import Pino from 'pino'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import PQueue from 'p-queue'
import Datastore from '@seald-io/nedb';
import store from './lib/store.js'
import readline from 'readline'
import NodeCache from 'node-cache' 
import { mdmxPreBots } from './plugins/sock.js';
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { makeInMemoryStore, DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys')
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
protoType()
serialize()
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.timestamp = { start: new Date }
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());


//news
const dbPath = path.join(__dirname, 'database');
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

const collections = {
users: new Datastore({ filename: path.join(dbPath, 'users.db'), autoload: true }),
chats: new Datastore({ filename: path.join(dbPath, 'chats.db'), autoload: true }),
settings: new Datastore({ filename: path.join(dbPath, 'settings.db'), autoload: true }),
msgs: new Datastore({ filename: path.join(dbPath, 'msgs.db'), autoload: true }),
sticker: new Datastore({ filename: path.join(dbPath, 'sticker.db'), autoload: true }),
stats: new Datastore({ filename: path.join(dbPath, 'stats.db'), autoload: true }),
};

Object.values(collections).forEach(db => {
  db.setAutocompactionInterval(60000);
});

global.db = { data: {
users: {},
chats: {},
settings: {},
msgs: {},
sticker: {},
stats: {},
},
};

function sanitizeId(id) {
  return id.replace(/\./g, '_');
}

function unsanitizeId(id) {
  return id.replace(/_/g, '.');
}

function sanitizeObject(obj) {
const sanitized = {};
for (const [key, value] of Object.entries(obj)) {
const sanitizedKey = key.replace(/\./g, '_');
sanitized[sanitizedKey] = (typeof value === 'object' && value !== null) ? sanitizeObject(value) : value;
}
return sanitized;
}

function unsanitizeObject(obj) {
const unsanitized = {};
for (const [key, value] of Object.entries(obj)) {
const unsanitizedKey = key.replace(/_/g, '.');
unsanitized[unsanitizedKey] = (typeof value === 'object' && value !== null) ? unsanitizeObject(value) : value;
}
return unsanitized;
}

async function readFromNeDB(category, id) {
const sanitizedId = sanitizeId(id);
return new Promise((resolve, reject) => {
collections[category].findOne({ _id: sanitizedId }, (err, doc) => {
if (err) {
console.error(`Error leyendo ${category}/${id}:`, err);
return reject(err);
}
resolve(doc ? unsanitizeObject(doc.data) : {});
});
});
}

async function writeToNeDB(category, id, data) {
const sanitizedId = sanitizeId(id);
const sanitizedData = sanitizeObject(data);
return new Promise((resolve, reject) => {
collections[category].update(
{ _id: sanitizedId },
{ $set: { data: sanitizedData } },
{ upsert: true, multi: false },
(err) => {
if (err) {
console.error(`Error escribiendo ${category}/${id}:`, err);
return reject(err);
}
collections[category].compactDatafile();
resolve();
});
});
}

global.db.readData = async function (category, id) {
const originalId = id;
if (!global.db.data[category][originalId]) {
const data = await readFromNeDB(category, originalId);
global.db.data[category][originalId] = data;
}
return global.db.data[category][originalId];
};

global.db.writeData = async function (category, id, data) {
const originalId = id;
global.db.data[category][originalId] = { ...global.db.data[category][originalId], ...data };
await writeToNeDB(category, originalId, global.db.data[category][originalId]);
};

global.db.loadDatabase = async function () {
const loadPromises = Object.keys(collections).map(async (category) => {
const docs = await new Promise((resolve, reject) => {
collections[category].find({}, (err, docs) => {
if (err) return reject(err);
resolve(docs);
});
});
const seenIds = new Set();
for (const doc of docs) {
const originalId = unsanitizeId(doc._id);
if (seenIds.has(originalId)) {
await new Promise((res, rej) => {
collections[category].remove({ _id: doc._id }, {}, (err) => {
if (err) {
console.error(`Error eliminando duplicado ${originalId}:`, err);
rej(err);
} else {
collections[category].persistence.compactDatafile();
res();
}});
});
} else {
seenIds.add(originalId);
if (category === 'users' && (originalId.includes('@newsletter') || originalId.includes('lid'))) continue;
if (category === 'chats' && originalId.includes('@newsletter')) continue;
global.db.data[category][originalId] = unsanitizeObject(doc.data);
}}});

await Promise.all(loadPromises);
};

global.db.save = async function () {
const savePromises = [];
for (const category of Object.keys(global.db.data)) {
for (const [id, data] of Object.entries(global.db.data[category])) {
if (Object.keys(data).length > 0) {
if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
if (category === 'chats' && id.includes('@newsletter')) continue;
savePromises.push(writeToNeDB(category, id, data));
}}}
await Promise.all(savePromises);
};

global.db.loadDatabase().then(() => {
console.log('Base de datos lista');
}).catch(err => {
console.error('Error cargando base de datos:', err);
});


async function gracefulShutdown() {
console.log('Guardando base de datos antes de cerrar...');
await global.db.save();
console.log('Base de datos guardada. Cerrando el bot...');
process.exit(0);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);


global.creds = 'creds.json'
global.authFile = 'MdmxSesion'
global.authFileMx = 'MdmxDirector'
global.rutaBot = join(__dirname, authFile)
global.rutaMxBot = join(__dirname, authFileMx)
const respaldoDir = join(__dirname, 'BackupSession');
const credsFile = join(global.rutaBot, global.creds);
const backupFile = join(respaldoDir, global.creds);

if (!fs.existsSync(rutaMxBot)) {
fs.mkdirSync(rutaMxBot)}

if (!fs.existsSync(respaldoDir)) fs.mkdirSync(respaldoDir);

const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile)
const msgRetryCounterMap = new Map();
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const {version} = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumberCode
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
let rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: true,
})

const question = (texto) => {
rl.clearLine(rl.input, 0)
return new Promise((resolver) => {
rl.question(texto, (respuesta) => {
rl.clearLine(rl.input, 0)
resolver(respuesta.trim())
})})
}

let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
do {
opcion = await question(`
【 ${chalk.green.bgGreen.bold.white('SELECCIONE UNA OPCION')} 】
${chalk.greenBright('⟤')} 1 : ${chalk.yellowBright('Vincular con codigo QR.')}
${chalk.greenBright('⟤')} 2 : ${chalk.yellowBright('Vincular con 8 digitos.')}
${chalk.bold.blueBright('---> ')}`)
if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright('【 ERROR 】Ocurrio un error, intentalo de nuevo.'))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

const filterStrings = [
"Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
"Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
"RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
"U2Vzc2lvbiBlcnJvcg==", // "Session error"
"RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC" 
"RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message" 
]

console.info = () => {} 
console.debug = () => {} 
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))
const connectionOptions = {
logger: pino({ level: 'silent' }), 
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile,
auth: { 
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
browser: opcion == '1' ? ['MDMX', 'Edge', '20.0.04'] : methodCodeQR ? ['MDMX', 'Edge', '20.0.04'] : ["Ubuntu", "Chrome", "20.0.04"],
version: version, 
generateHighQualityLinkPreview: true, 
markOnlineOnConnect: false, 
syncFullHistory: false, 
msgRetryCounterCache: msgRetryCounterCache, 
userDevicesCache: userDevicesCache, 
defaultQueryTimeoutMs: 60000, 
cachedGroupMetadata: async (jid) => { 
return global.db.data.chats[jid] || {};
},
getMessage: async (key) => { 
try {
let jid = jidNormalizedUser(key.remoteJid);
let msg = await store.loadMessage(jid, key.id);
return msg?.message || "";
} catch {
return "";
}
},
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
};
    
global.conn = makeWASocket(connectionOptions)

if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`【 SUCCESS 】Ingrese su numero de WhatsApp para vincular, por ejemplo: +5493873655135\n--> `)))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}
} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgGreen('CODIGO:')), chalk.bold.white(chalk.white(codeBot)))
}, 2000)
}}}
}

conn.isInit = false
conn.well = false

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.save();
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', "MdmxDirector"], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '2', '-type', 'f', '-delete'])))}, 30 * 1000)}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

//respaldo de la sesión "MdmxSesion"
const backupCreds = () => {
if (fs.existsSync(credsFile)) {
fs.copyFileSync(credsFile, backupFile);
console.log(`【 SUCCESS | ${backupFile} 】`);
} else {
console.log('【 ERROR | REPLACED 】');
}};

const restoreCreds = () => {
if (fs.existsSync(credsFile)) {
fs.copyFileSync(backupFile, credsFile);
console.log(`【 SUCCESS | REPLACED 】`);
} else if (fs.existsSync(backupFile)) {
fs.copyFileSync(backupFile, credsFile);
console.log(`【 SUCCESS | RESTART 】`);
} else {
console.log('【 ERROR | CREDS 】');
}};

setInterval(async () => {
await backupCreds();
console.log('【 SUCCESS | RESPALDO 】');
}, 5 * 60 * 1000);

async function connectionUpdate(update) {  
const {connection, lastDisconnect, isNewLogin} = update
global.stopped = connection
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await global.reloadHandler(true).catch(console.error)
//console.log(await global.reloadHandler(true).catch(console.error));
global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
console.log(chalk.bold.green('【 SUCCESS 】Escanee el codigo QR, expira en 45 segundos aproximadamente.'))}
}
if (connection == 'open') {
console.log(chalk.bold.greenBright('【 EXITO 】Se ha conectado a WhatsApp con exito.'))
await joinChannels(conn)}
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
console.log(chalk.bold.redBright(`〘 ERROR 〙Ocurrio un error de conexion, borre la carpeta ( ${authFile} ) y vuelva a pedir QR o code.`))
} else if (reason === DisconnectReason.connectionClosed) {
console.log(chalk.bold.redBright(`〘 ERROR 〙Se ha cerrado la conexion, se imtentara reconectar.`))
restoreCreds();
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
console.log(chalk.bold.redBright(`〘 ERROR 〙Conexion perdida con el servidor, se intentara reconectar, de lo contrario use el boton ( RESTART ).`))
restoreCreds();
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(chalk.bold.redBright(`〘 ERROR 〙Se ha detectado una nueva sesion vinculada, borre la sesion reciente para mantener esta sesion intacta.`))
} else if (reason === DisconnectReason.loggedOut) {
console.log(chalk.bold.redBright(`〘 ERROR 〙Ocurrio un error de conexion, borre la carpeta ( ${authFile} ) y vuelva a pedir QR o code.`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
console.log(chalk.bold.greenBright(`〘 SUCCESS 〙Se ha reiniciado los datos con exito, reconectando...`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
console.log(chalk.bold.cyanBright(`〘 ERROR 〙El tiempo de vinculacion se ha agotado, vuelva a conectarse, borre la carpeta ( ${authFile} ) si este existe.`))
await global.reloadHandler(true).catch(console.error) //process.send('reset')
} else {
console.log(chalk.bold.redBright(`〘 ERROR 〙Razon de desconexion desconocida.`))
}}
}

process.on('uncaughtException', console.error);

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler;
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats;
try {
global.conn.ws.close();
} catch { }
conn.ev.removeAllListeners();
global.conn = makeWASocket(connectionOptions, {chats: oldChats});
isInit = true;
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler);
conn.ev.off('group-participants.update', conn.participantsUpdate);
conn.ev.off('groups.update', conn.groupsUpdate);
conn.ev.off('message.delete', conn.onDelete);
conn.ev.off('call', conn.onCall);
conn.ev.off('connection.update', conn.connectionUpdate);
conn.ev.off('creds.update', conn.credsUpdate);
}

conn.welcome = `🜲 \`B I E N V E N I D O\` 🜲\n𔒝 _¡¡Se ha unido un nuevo usuario!!_\n\n⎋ *Fecha:* ${botdate}\n⧖ *Hora:* ${bottime}\n🜲 *Usuario:* @user\n\n${String.fromCharCode(8206).repeat(850)}\n⏍ *REGLAS:*\n@desc` 
conn.bye = `🜲 \`H A S T A • P R O N T O\` 🜲\n𔒝 _¡¡Un participante salio del grupo!!_\n\n⎋ *Fecha:* ${botdate}\n⧖ *Hora:* ${bottime}\n🜲 *Usuario:* @user` 
conn.spromote = `✦ *N U E V O   A D M I N*\n- _Se ha asignado un admin mas en este grupo._\n\n🜲 *Usuario:* @user\n⏍ *Fecha:* ${botdate}` 
conn.sdemote = `✦ *A D M I N   M E N O S*\n- _Se ha designado un admin en este grupo._\n\n🜲 *Usuario:* @user\n⏍ *Fecha:* ${botdate}` 
conn.sDesc = `✦ *¡¡Nueva descripcion grupal!!*\n- _Se ha modificado la descripcion grupal recientemente._` 
conn.sSubject = `✦ *¡¡Nuevo titulo grupal!!*\n- _Se ha modificado el nombre grupal recientemente._` 
conn.sIcon = `✦ *¡¡Nueva foto grupal!!*\n- _Se ha modificado la foto grupal recientemente._` 
conn.sRevoke = `✦ *¡¡Nuevo enlace grupal!!*\n- _Se ha restablecido el enlace grupal recientemente._` 

conn.handler = handler.handler.bind(global.conn);
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
conn.onDelete = handler.deleteUpdate.bind(global.conn);
conn.onCall = handler.callUpdate.bind(global.conn);
conn.connectionUpdate = connectionUpdate.bind(global.conn);
conn.credsUpdate = saveCreds.bind(global.conn, true);
conn.ev.on('messages.upsert', conn.handler);
conn.ev.on('group-participants.update', conn.participantsUpdate);
conn.ev.on('groups.update', conn.groupsUpdate);
conn.ev.on('message.delete', conn.onDelete);
conn.ev.on('call', conn.onCall);
conn.ev.on('connection.update', conn.connectionUpdate);
conn.ev.on('creds.update', conn.credsUpdate);
isInit = false
return true
}



if (global.mdmxBots) {
const readRutaMxBot = readdirSync(rutaMxBot)
if (readRutaMxBot.length > 0) {
const creds = 'creds.json'
for (const gjbts of readRutaMxBot) {
const botPath = join(rutaMxBot, gjbts)
const readBotPath = readdirSync(botPath)
if (readBotPath.includes(creds)) {
mdmxPreBots({pathConexionMx: botPath, m: null, conn, args: '', usedPrefix: '/', command: 'newbot'})
}}
}}



const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
const dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(` SE ACTULIZADO - '${filename}' CON ÉXITO`)
else {
conn.logger.warn(`SE ELIMINO UN ARCHIVO : '${filename}'`)
return delete global.plugins[filename];
}
} else conn.logger.info(`SE DETECTO UN NUEVO PLUGINS : '${filename}'`)
const err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) conn.logger.error(`SE DETECTO UN ERROR DE SINTAXIS | SYNTAX ERROR WHILE LOADING '${filename}'\n${format(err)}`);
else {
try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(`HAY UN ERROR REQUIERE EL PLUGINS '${filename}\n${format(e)}'`);
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
}}}};

Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

async function _quickTest() {
const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127);
});
}),

new Promise((resolve) => {
p.on('error', (_) => resolve(false));
})]);
}));

const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
Object.freeze(global.support);
}

function clearTmp() {
const tmpDir = join(__dirname, 'tmp')
const filenames = readdirSync(tmpDir)
filenames.forEach(file => {
const filePath = join(tmpDir, file)
unlinkSync(filePath)})
}

async function purgeSession() {
const sessionDir = './MdmxSesion';
try {
if (!existsSync(sessionDir)) return;
const files = await readdir(sessionDir);
const preKeys = files.filter(file => file.startsWith('pre-key-')); 
const now = Date.now();
const oneHourAgo = now - (24 * 60 * 60 * 1000); //24 horas
    
for (const file of preKeys) {
const filePath = join(sessionDir, file);
const fileStats = await stat(filePath);
if (fileStats.mtimeMs < oneHourAgo) { 
try {
await unlink(filePath);
console.log(chalk.green(`✓ Delete pre-key: ${file}`));
} catch (err) {

}} else {
console.log(chalk.yellow(`✓ Undefined pre-key: ${file}`));
}}
console.log(chalk.cyanBright(`✓ Delete files: ${global.authFile}`));
} catch (err) {

}}

async function purgeSessionSB() {
const jadibtsDir = './MdmxDirector/';
try {
if (!existsSync(jadibtsDir)) return;
const directories = await readdir(jadibtsDir);
let SBprekey = [];
const now = Date.now();
const oneHourAgo = now - (24 * 60 * 60 * 1000); //24 horas
    
for (const dir of directories) {
const dirPath = join(jadibtsDir, dir);
const stats = await stat(dirPath);
if (stats.isDirectory()) {
const files = await readdir(dirPath);
const preKeys = files.filter(file => file.startsWith('pre-key-') && file !== 'creds.json');
SBprekey = [...SBprekey, ...preKeys];
for (const file of preKeys) {
const filePath = join(dirPath, file);
const fileStats = await stat(filePath);
if (fileStats.mtimeMs < oneHourAgo) { 
try {
await unlink(filePath);
console.log(chalk.bold.green(`【 SUCCESS 】Se han eliminado ${file} archivos innecesarios.`))
} catch (err) {

}} else {

}}}}
if (SBprekey.length === 0) {
console.log(chalk.bold.green('【 SUCCESS 】'))
} else {
console.log(chalk.cyanBright(`【 SUCCESS 】`));
}} catch (err) {
console.log(chalk.bold.red('【 ERROR 】 ' + err))
}}

async function purgeOldFiles() {
const directories = ['./MdmxSesion/', './MdmxDirector/'];
for (const dir of directories) {
try {
if (!fs.existsSync(dir)) { 
console.log(chalk.yellow(`【 WARNING | ${dir} 】No existe.`));
continue;
}
const files = await fsPromises.readdir(dir); 
for (const file of files) {
if (file !== 'creds.json') {
const filePath = join(dir, file);
try {
await fsPromises.unlink(filePath);

} catch (err) {

}}}
} catch (err) {

}}

}

function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await clearTmp()
console.log(chalk.bold.cyanBright('✓ Se han eliminado los archivos innecesarios en la carpeta TMP.'))}, 1000 * 60 * 3)

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await purgeSessionSB()
await purgeSession()
console.log(chalk.bold.greenBright('✓ Archivos innecesarios fueron eliminados con exito.'))
await purgeOldFiles()
console.log(chalk.bold.greenBright('✓ Archivos innecesarios fueron eliminados con exito.'))}, 1000 * 60 * 10)

_quickTest().then(() => conn.logger.info(chalk.bold('Cargando, espere un momento...'))).catch(console.error)

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright(`✓ Se actualizado 'main.js' con exito.`.trim()))
import(`${file}?update=${Date.now()}`)
})

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
if (number.startsWith('+521')) {
number = number.replace('+521', '+52'); 
} else if (number.startsWith('+52') && number[4] === '1') {
number = number.replace('+52 1', '+52'); 
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}

async function joinChannels(conn) {
for (const channelId of Object.values(global.miscanales)) {
await conn.newsletterFollow(channelId).catch(() => {})
}}