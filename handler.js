import { smsg } from './lib/simple.js'
import { format } from 'util' 
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'

const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || []
this.uptime = this.uptime || Date.now()
if (!chatUpdate)
return
    this.pushMessage(chatUpdate.messages).catch(console.error)
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m)
return;
if (global.db.data == null)
await global.loadDatabase()       
try {
m = smsg(this, m) || m
if (!m)
return
m.exp = 0
m.money = false
try {
let user = global.db.data.users[m.sender]
if (typeof user !== 'object')
  
global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.money)) user.money = 0
if (!isNumber(user.limit)) user.limit = 0
if (!isNumber(user.tickets)) user.tickets = 0
if (!('profileff' in user)) user.profileff = false
if (!('muto' in user)) user.muto = false
if (!('premium' in user)) user.premium = false
if (!('moderator' in user)) user.moderator = false
if (!('administrator' in user)) user.administrator = false
if (!user.premium) user.premiumTime = 0
if (!user.moderator) user.moderatorTime = 0
if (!user.administrator) user.administratorTime = 0
if (!('registered' in user))user.registered = false
if (!user.registered) {
//if (!('age' in user)) user.age = m.age
//if (!('name' in user)) user.name = m.name
//if (!('genero' in user)) user.genero = m.genero
//if (!('descripcion' in user)) user.descripcion = m.descripcion
//if (!('birth' in user)) user.birth = m.birth
if (!('profilef' in user)) user.profilef = m.profilef
if (!isNumber(user.age)) user.age = ''
if (!isNumber(user.name)) user.name = ''
if (!isNumber(user.genero)) user.genero = ''
if (!isNumber(user.birth)) user.birth = ''
if (!isNumber(user.descripcion)) user.descripcion = ''
if (!isNumber(user.regTime)) user.regTime = -1
}
if (!isNumber(user.afk)) user.afk = -1
if (!('afkReason' in user)) user.afkReason = ''
if (!('banned' in user)) user.banned = false
if (!('useDocument' in user)) user.useDocument = false
if (!isNumber(user.level)) user.level = 0
if (!isNumber(user.role)) user.role = ''
if (!isNumber(user.bank)) user.bank = 0
if (!isNumber(user.bankk)) user.bankk = 0
if (!isNumber(user.bankkk)) user.bankk = 0
} else
global.db.data.users[m.sender] = {
exp: 0,
money: 0,
limit: 0,
tickets: 0,
profilef: '',
profileff: false,
premium: false,
moderator: false,
administrator: false,
muto: false,
registered: false,
role: '',
name: '',
birth: '',
descripcion: '',
genero: '',
age: '',
regTime: -1,
afk: -1,
afkReason: '',
banned: false,
useDocument: false,
bank: 0,
bankk: 0,
bankkk: 0,
level: 0,
}
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object')
global.db.data.chats[m.chat] = {}
if (chat) {
if (!('isBanned' in chat)) chat.isBanned = false
if (!('welcome' in chat)) chat.welcome = true
if (!('audios' in chat)) chat.audios = false
if (!('detect' in chat)) chat.detect = true
if (!('onlyLatinos' in chat)) chat.onlyLatinos = true 
if (!('antiBot' in chat)) chat.antiBot = false
if (!('antiBot2' in chat)) chat.antiBot2 = false
if (!('modoadmin' in chat)) chat.modoadmin = false   
if (!('antiLink' in chat)) chat.antiLink = false
if (!('modohorny' in chat)) chat.modohorny = false
if (!('reaction' in chat)) chat.reaction = false
if (!('simi' in chat)) chat.simi = false
if (!('antiver' in chat)) chat.antiver = false
if (!('delete' in chat)) chat.delete = false
if (!isNumber(chat.expired))
chat.expired = 0
} else
global.db.data.chats[m.chat] = {
isBanned: false,
welcome: true,
delete: false,
onlyLatinos: false,
audios: false,
detect: true,
antiBot: false,
antiBot2: false,
modoadmin: false,
antiLink: false,
simi: false,
antiver: false,
modohorny: false, 
reaction: false,
expired: 0, 
}
var settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
if (settings) {
if (!('self' in settings)) settings.self = false
if (!('restrict' in settings)) settings.restrict = true
if (!('serbot' in settings)) settings.serbot = false
if (!('autobio' in settings)) settings.autobio = false
if (!('antiPrivate' in settings)) settings.antiPrivate = true
if (!('autoread' in settings)) settings.autoread = false
if (!('autoread2' in settings)) settings.autoread2 = false
if (!('antiSpam' in settings)) settings.antiSpam = false
} else global.db.data.settings[this.user.jid] = {
self: false,
restrict: true,
serbot: false,
autobio: false,
antiPrivate: true,
autoread: false,
autoread2: false,
antiSpam: false,
status: 0
}
} catch (e) {
console.error(e)
}
if (opts['nyimak'])  return
if (!m.fromMe && opts['self'])  return
if (opts['swonly'] && m.chat !== 'status@broadcast')  return
if (typeof m.text !== 'string')
m.text = ''

let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isOwner = isROwner || m.fromMe
const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || _user.prem == true

if (opts['queque'] && m.text && !(isMods || isPrems)) {
let queque = this.msgqueque, time = 1000 * 5
const previousID = queque[queque.length - 1]
queque.push(m.id || m.key.id)
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this)
await delay(time)
}, time)
}

//if (m.isBaileys) return 
if (m.isBaileys || isBaileysFail && m?.sender === this?.this?.user?.jid) {
return
}
m.exp += Math.ceil(Math.random() * 10)

let usedPrefix

const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
const participants = (m.isGroup ? groupMetadata.participants : []) || []
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}
const isRAdmin = user?.admin == 'superadmin' || false
const isAdmin = isRAdmin || user?.admin == 'admin' || false
const isBotAdmin = bot?.admin || false

const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
for (let name in global.plugins) {
let plugin = global.plugins[name]
if (!plugin)
continue
if (plugin.disabled)
continue
const __filename = join(___dirname, name)
if (typeof plugin.all === 'function') {
try {
await plugin.all.call(this, m, {
chatUpdate,
__dirname: ___dirname,
__filename
})
} catch (e) {
console.error(e)
}}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {
continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
let match = (_prefix instanceof RegExp ? 
[[_prefix.exec(m.text), _prefix]] :
Array.isArray(_prefix) ?
_prefix.map(p => {
let re = p instanceof RegExp ?
p :
new RegExp(str2Regex(p))
return [re.exec(m.text), re]
}) :
typeof _prefix === 'string' ?
[[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
[[[], new RegExp]]
).find(p => p[1])
if (typeof plugin.before === 'function') {
if (await plugin.before.call(this, m, {
match,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}))
continue
}
if (typeof plugin !== 'function')
continue
if ((usedPrefix = (match[0] || '')[0])) {
let noPrefix = m.text.replace(usedPrefix, '')
let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
args = args || []
let _args = noPrefix.trim().split` `.slice(1)
let text = _args.join` `
command = (command || '').toLowerCase()
let fail = plugin.fail || global.dfail
let isAccept = plugin.command instanceof RegExp ? 
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ?
                        plugin.command.some(cmd => cmd instanceof RegExp ? 
                            cmd.test(command) :
cmd === command) :
typeof plugin.command === 'string' ? 
plugin.command === command :
false

if (!isAccept) {
continue
}
m.plugin = name
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (!['Grupo•unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
if (name != 'Grupo•unbanchat.js' && name != 'Owner•exec.js' && name != 'Owner•exec2.js' && name != 'Grupo•delete.js' && chat?.isBanned && !isROwner) return 
if (m.text && user.banned && !isROwner) {
if (user.antispam > 2) return
conn.sendMessage(m.chat, 
{ text: `〘 \`P R O H I B I D O\` 〙
- _Estas prohibido a usar el bot debido al spam generado por ti ultamente._
_Si esto es un error, contacta con soporte para apelar la situacion._` }, 
{ quoted: m }) //Texto.
user.antispam++        
return
}

//Antispam 2                
if (user.antispam2 && isROwner) return
let time = global.db.data.users[m.sender].spam + 3000
if (new Date - global.db.data.users[m.sender].spam < 3000) return console.log(`[ SPAM ]`) 
global.db.data.users[m.sender].spam = new Date * 1
}
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let setting = global.db.data.settings[this.user.jid]
if (name != 'Grupo•unbanchat.js' && chat?.isBanned)
return 
if (name != 'owner•unbanuser.js' && user?.banned)
return
}
let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let mxUtilidad = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mxUtilidad) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { 
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { 
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { 
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) { 
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) { 
fail('premium', m, this)
continue
}
if (plugin.group && !m.isGroup) { 
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { 
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { 
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) {
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { 
fail('unreg', m, this)
continue
}
m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 
if (xp > 200)
m.reply('chirrido -_-')
else
m.exp += xp
if (!isPrems && plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
conn.sendMessage(m.chat, { text: `✘ _No tienes suficientes *${currency}* para usar este comando._` }, { quoted: m }) //Texto.
continue
}
let extra = {
match,
usedPrefix,
noPrefix,
_args,
args,
command,
text,
conn: this,
participants,
groupMetadata,
user,
bot,
isROwner,
isOwner,
isRAdmin,
isAdmin,
isBotAdmin,
isPrems,
chatUpdate,
__dirname: ___dirname,
__filename
}
try {
await plugin.call(this, m, extra)
if (!isPrems)
m.money = m.money || plugin.money || false
} catch (e) {
m.error = e
console.error(e)
if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), 'Administrador')
m.reply(text)
}
} finally {
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.money)
conn.sendMessage(m.chat, { text: `✓ _Has gastado_ ${+m.money} _*${currency}*_` }, m) //Texto.
}
break
}}
} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
}
let user, stats = global.db.data.stats
if (m) { let utente = global.db.data.users[m.sender]
if (utente.muto == true) {
let bang = m.key.id
let cancellazzione = m.key.participant
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }})
}
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.money -= m.money * 1
}

let stat
if (m.plugin) {
let now = +new Date
if (m.plugin in stats) {
stat = stats[m.plugin]
if (!isNumber(stat.total))
stat.total = 1
if (!isNumber(stat.success))
stat.success = m.error != null ? 0 : 1
if (!isNumber(stat.last))
stat.last = now
if (!isNumber(stat.lastSuccess))
stat.lastSuccess = m.error != null ? 0 : now
} else
stat = stats[m.plugin] = {
total: 1,
success: m.error != null ? 0 : 1,
last: now,
lastSuccess: m.error != null ? 0 : now
}
stat.total += 1
stat.last = now
if (m.error == null) {
stat.success += 1
stat.lastSuccess = now
}}}

try {
if (!opts['noprint']) await (await import(`./lib/print.js`)).default(m, this)
} catch (e) { 
console.log(m, m.quoted, e)}
let settingsREAD = global.db.data.settings[this.user.jid] || {}  
if (opts['autoread']) await this.readMessages([m.key])
if (settingsREAD.autoread2) await this.readMessages([m.key])  

if (db.data.chats[m.chat].reaction && m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify|ai|yaemori|a|s)/gi)) {
let emot = pickRandom([
"✝️", "🛐", "🏖️", "🎲", "🎊", "🧿", 
"🍔", "🌮", "🛠️", "🌬️", "✨", "😊", 
"🍿", "🐦", "📍", "🧨", "🏅", "🌹", 
"🍇", "🌊", "🗿", "🧧", "🌺", "🪐", 
"🍉", "⏰", "🎏", "🎋", "🚺", "☁️", 
"💧", "✅", "🎇", "🎆", "🎨", "⬇️", 
"🥳", "⏱️", "🛰️", "🚀", "🧸", "🌹", 
"⬇️", "⬆️", "🌎", "🏆", "🎖️", "🎳"])
if (!m.fromMe) return this.sendMessage(m.chat, { react: { text: emot, key: m.key }})
}
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)]}
}}

export async function deleteUpdate(message) {
try {
const { fromMe, id, participant } = message
if (fromMe) return 
let msg = this.serializeM(this.loadMessage(id))
let chat = global.db.data.chats[msg?.chat] || {}
if (!chat?.delete) return 
if (!msg) return 
if (!msg?.isGroup) return 
const antideleteMessage = `⫶☰ \`I N F O R M A C I O N\`
- _El participante_ @${participant.split`@`[0]}, _ha eliminado un mensaje, sera reenviado de inmediato._

[ *NOTA* ]: _No se admite eliminar mensajes en este chat._`.trim();
await this.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
} catch (e) {
console.error(e)
}}

global.dfail = (type, m, command, usedPrefix, conn) => {
const msg = {
rowner: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado por el propietario del bot._`,
owner: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado por los administradores del bot y el propietario._`,
mods: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado por los moderadores del bot._`,
premium: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado por los usuarios premium del bot._`,
group: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado en chats grupales._`,
private: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado en chats individuales._`,
admin: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser utilizado por administradores grupales._`,
botAdmin: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser ejecutado si el bot de administrador grupal._\n- _No puede hacer esta accion que solo un admin puede._`,
unreg: `〘 LYRU 〙_Lo siento, el comando ( *${usedPrefix + command}* ) solo puede ser ejecutado al tener un registro._\n- _Es opcional registrarte para usar comandos que necesiten un registro._`,
restrict: `〘 LYRU 〙_Lo siento, este comando solo puede ser utilizado si las restricciones del bot esta activas._`
}[type];
if (msg) return await conn.sendMessage(m.chat, { text: msg, footer: 'Presiona el boton para ver el menu, esto para buscar comandos que no requieran esta opcion.', buttons: [{ buttonId: `${usedPrefix}menu`, buttonText: { displayText: "⫶☰ MENU", }, type: 1, },], viewOnce: true, headerType: 4, }, { quoted: m }).then(_ => m.react('🛑'))}
/*
if (msg) {
if (type === 'unreg') {
await conn.sendMessage(m.chat, { text: msg, footer: 'Presiona el boton para registrarte y usar funciones que requieran un registro.', buttons: [{ buttonId: `${usedPrefix}register`, buttonText: { displayText: "⎋ Registrarse", }, type: 1, },], viewOnce: true, headerType: 4, }, { quoted: m })
await m.react('📝')
} else {
await conn.sendMessage(m.chat, { text: msg, footer: 'Presiona el boton para ver el menu, esto para buscar comandos que no requieran esta opcion.', buttons: [{ buttonId: `${usedPrefix}menu`, buttonText: { displayText: "⫶☰ MENU", }, type: 1, },], viewOnce: true, headerType: 4, }, { quoted: m })
await m.react('🛑')
 }
}
*/

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.green("Se actualizo 'handler.js'"))
//if (global.reloadHandler) console.log(await global.reloadHandler())

if (global.conns && global.conns.length > 0 ) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
for (const userr of users) {
userr.subreloadHandler(false)
}}});