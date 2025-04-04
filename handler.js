import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'   
import fetch from 'node-fetch'
import './plugins/_mdmx.js'
 
/**
 * @type {import('@adiwajshing/baileys')}  
 */
const { proto } = (await import('@whiskeysockets/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
clearTimeout(this)
resolve()
}, ms))

/**
 * Handle messages upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupsUpdate 
 */
export async function handler(chatUpdate) {
this.msgqueque = this.msgqueque || [];
this.uptime = this.uptime || Date.now();
if (!chatUpdate) {
return
}
if (!chatUpdate || !chatUpdate.messages) {
return
} else {
this.pushMessage(chatUpdate.messages).catch(console.error)
}
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m) {
return;
}
if (global.db.data == null) await global.loadDatabase()
try {
m = smsg(this, m) || m
if (!m)
return
m.exp = 0
m.limit = false
m.money = false
try {
// TODO: use loop to insert data instead of this
let user = global.db.data.users[m.sender]
if (typeof user !== 'object')
global.db.data.users[m.sender] = {}
if (user) {
if (!isNumber(user.exp)) user.exp = 0;
if (user.exp < 0) user.exp = 0; 
if (!isNumber(user.money)) user.money = 0;
if (user.money < 0) user.money = 0; 
if (!isNumber(user.limit)) user.limit = 0;
if (user.limit < 0) user.limit = 0; 
if (!isNumber(user.joincount)) user.joincount = 1 
if (user.joincount < 0) user.joincount = 0; 
if (!('premium' in user)) user.premium = false
if (!('muto' in user)) user.muto = false  
if (!('registered' in user)) user.registered = false
if (!('registroR' in user)) user.registroR = false
if (!('registroC' in user)) user.registroC = false  
if (!isNumber(user.IDregister)) user.IDregister = 0 
if (!user.registered) {
if (!('name' in user)) user.name = m.name
if (!('age' in user)) user.age = 0
if (!('descripcion' in user)) user.descripcion = 0
if (!('genero' in user)) user.genero = 0
if (!('identidad' in user)) user.identidad = 0
if (!('pasatiempo' in user)) user.pasatiempo = 0
if (!('tiempo' in user)) user.tiempo = 0 
if (!('miestado' in user)) user.miestado = 0
if (!isNumber(user.emas)) user.emas = 0
if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
if (!isNumber(user.antispam)) user.antispam = 0
if (!isNumber(user.premiumDate)) user.premiumDate = -1
if (!isNumber(user.regTime)) user.regTime = -1
}
	  		    
if (!isNumber(user.afk)) user.afk = -1
if (!isNumber(user.reporte)) user.reporte = 0
if (!('role' in user)) user.role = 'Novato.'
if (!user.warnPv) user.warnPv = false
if (!isNumber(user.juegos)) user.juegos = 0
if (!isNumber(user.bank)) user.bank = 0
if (!isNumber(user.bank)) user.bankk = 0
if (!isNumber(user.bank)) user.bankkk = 0
if (!isNumber(user.coin)) user.coin = 0
if (!isNumber(user.cw)) user.cw = []
if (!isNumber(user.cw_a)) user.cw_a = 0
if (!isNumber(user.cw_b)) user.cw_b = 0
if (!isNumber(user.cw_c)) user.cw_c = 0
if (!isNumber(user.cw_d)) user.cw_d = 0
if (!isNumber(user.cw_e)) user.cw_e = 0
if (!isNumber(user.cupon)) user.cupon = 0
if (!isNumber(user.diamond)) user.diamond = 0
if (!isNumber(user.emas)) user.emas = 0
if (!isNumber(user.exp)) user.exp = 0
if (!isNumber(user.gamemines)) user.gamemines = false
if (!isNumber(user.gold)) user.gold = 0
if (!isNumber(user.haus)) user.haus = 0
if (!isNumber(user.healt)) user.healt = 0
if (!isNumber(user.health)) user.health = 0
if (!isNumber(user.healthmonster)) user.healthmonster = 0
if (!isNumber(user.healtmonster)) user.healtmonster = 0
if (!isNumber(user.joinlimit)) user.joinlimit = 1
if (!isNumber(user.laper)) user.laper = 100
if (!isNumber(user.time_cofre)) user.time_cofre = 0
if (!isNumber(user.time_slot)) user.time_slot = 0
if (!isNumber(user.time_transfer)) user.time_transfer = 0
if (!isNumber(user.time_exp)) user.time_exp = 0
if (!isNumber(user.time_limit)) user.time_limit = 0
if (!isNumber(user.time_money)) user.time_money = 0
if (!isNumber(user.time_gold)) user.time_gold = 0
if (!isNumber(user.time_claim)) user.time_claim = 0
if (!isNumber(user.time_kill)) user.time_kill = 0
if (!isNumber(user.time_descarga)) user.time_descarga = 0
if (!isNumber(user.time_acertijo)) user.time_acertijo = 0
if (!isNumber(user.time_calcular)) user.time_calcular = 0
if (!isNumber(user.time_mdmx)) user.time_mdmx = 0
if (!isNumber(user.level)) user.level = 0
if (!isNumber(user.limit)) user.limit = 0
if (!isNumber(user.spam)) user.spam = 0
if (!isNumber(user.money)) user.money = 0
if (!isNumber(user.potion)) user.potion = 0
if (!isNumber(user.rock)) user.rock = 0
if (!isNumber(user.banco)) user.banco = 0
if (!isNumber(user.spammer)) user.spammer = 0
if (!user.mensaje) user.mensaje = 0;
if (!isNumber(user.title)) user.title = 0
if (!user.packname) user.packname = null
if (!user.author) user.author = null
if (!isNumber(user.wallet)) user.wallet = 0
if (!isNumber(user.warn)) user.warn = 0
if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'
if (!user.job) user.job = 'Desempleo'
if (!user.premium) user.premium = false
if (!user.premium) user.premiumTime = 0
if (!user.moderator) user.moderator = false
if (!user.moderator) user.moderatorTime = 0
if (!user.administrator) user.administrator = false
if (!user.administrator) user.administratorTime = false
if (!user.rtrofi) user.rtrofi = 'Bronce'
} else
global.db.data.users[m.sender] = {
afk: -1,
afkReason: '',
reporte: 0,
name: m.name,
age: 0,
genero: 0,
identidad: 0,
pasatiempo: 0,
tiempo: 0,
miestado: 0,	
descripcion: 0,
premLimit: 0,
juegos: 0,
title: 0,
messageSpam: 0,
warnPv: false,
banco: 0,
mensaje: 0,
antispam: 0,
antispamlastclaim: 0,
bank: 0,
bankk: 0,
bankkk: 0,
packname: null,
author: null,
banned: false,
BannedReason: '',
Banneduser: false,
coin: 0,
cupon: 0,
diamond: 0,
cw: [],
cw_a: 0,
cw_b: 0,
cw_c: 0,
cw_d: 0,
cw_e: 0,
emas: 0,
exp: 0,
expired: 0,
gamemines: false,
gold: 0,
haus: 100,
healt: 100,
health: 100,
healtmonster: 100,
job: 'Pengangguran',
joincount: 0,
joinlimit: 0,
laper: 100,
time_cofre: 0,
time_slot: 0,
time_transfer: 0,
time_exp: 0,
time_limit: 0,
time_money: 0,
time_gold: 0,
time_claim: 0,
time_kill: 0,
time_descarga: 0,
time_acertijo: 0,
time_calcular: 0,
time_mdmx: 0,
lbars: '[▒▒▒▒▒▒▒▒▒]',
level: 0,
limit: 0,
misi: '',
money: 0,
potion: 0,
muto: false,
premium: false,
premiumTime: 0,
moderator: false,
moderatorTime: 0,
administrator: false,
administratorTime: 0,
registered: false,
registroR: false,
registroC: false,
regTime: -1,
rock: 0,
role: 'Novato',
rtrofi: 'bronce',
ticket: 0,
boletos: 0,
sewa: false,
spam: 0,
skill: '',
title: '',
wallet: 0,
warn: 0,
}
let akinator = global.db.data.users[m.sender].akinator
if (typeof akinator !== 'object')
global.db.data.users[m.sender].akinator = {}
if (akinator) {
if (!('sesi' in akinator)) akinator.sesi = false
if (!('server' in akinator)) akinator.server = null
if (!('frontaddr' in akinator)) akinator.frontaddr = null
if (!('session' in akinator)) akinator.session = null
if (!('signature' in akinator)) akinator.signature = null
if (!('question' in akinator)) akinator.question = null
if (!('progression' in akinator)) akinator.progression = null
if (!('step' in akinator)) akinator.step = null
if (!('soal' in akinator)) akinator.soal = null
} else
global.db.data.users[m.sender].akinator = {
sesi: false,
server: null,
frontaddr: null,
session: null,
signature: null,
question: null,
progression: null,
step: null, 
soal: null
}   		
let chat = global.db.data.chats[m.chat]
if (typeof chat !== 'object')
global.db.data.chats[m.chat] = {}
		
if (chat) {
if (!('isBanned' in chat)) chat.isBanned = false         
if (!('welcome' in chat)) chat.welcome = true           
if (!('detect' in chat)) chat.detect = false   
if (!('sWelcome' in chat)) chat.sWelcome = ''          
if (!('sBye' in chat)) chat.sBye = ''        
if (!('sPromote' in chat)) chat.sPromote = '' 
if (!('sDemote' in chat)) chat.sDemote = '' 
if (!('sCondition' in chat)) chat.sCondition = ''
if (!('sAutorespond' in chat)) chat.sAutorespond = '' 
if (!('delete' in chat)) chat.delete = false       
if (!('modohorny' in chat)) chat.modohorny = true       
if (!('stickers' in chat)) chat.stickers = false
if (!('autosticker' in chat)) chat.autosticker = false      
if (!('audios' in chat)) chat.audios = true   
if (!('antiver' in chat)) chat.antiver = false 
if (!('antiPorn' in chat)) chat.antiPorn = true     
if (!('antiLink' in chat)) chat.antiLink = false     
if (!('antiLink2' in chat)) chat.antiLink2 = false
if (!('antiTiktok' in chat)) chat.antiTiktok = false
if (!('antiYoutube' in chat)) chat.antiYoutube = false
if (!('antiTelegram' in chat)) chat.antiTelegram = false
if (!('antiFacebook' in chat)) chat.antiFacebook = false
if (!('antiInstagram' in chat)) chat.antiInstagram = false
if (!('antiTwitter' in chat)) chat.antiTwitter = false
if (!('antiDiscord' in chat)) chat.antiDiscord = false
if (!('antiThreads' in chat)) chat.antiThreads = false
if (!('antiTwitch' in chat)) chat.antiTwitch = false
if (!('antifake' in chat)) chat.antifake = false
if (!('reaction' in chat)) chat.reaction = true    
if (!('viewonce' in chat)) chat.viewonce = false       
if (!('modoadmin' in chat)) chat.modoadmin = false  
if (!('autorespond' in chat)) chat.autorespond = true
if (!('antitoxic' in chat)) chat.antitoxic = true
if (!('game' in chat)) chat.game = true
if (!('game2' in chat)) chat.game2 = true
if (!('simi' in chat)) chat.simi = false
if (!('antiTraba' in chat)) chat.antiTraba = true
if (!('primaryBot' in chat)) chat.primaryBot = null
if (!('autolevelup' in chat))  chat.autolevelup = true
if (!isNumber(chat.expired)) chat.expired = 0
if (!('horarioNsfw' in chat)) { 
chat.horarioNsfw = {
inicio: "00:00", 
fin: "23:59"
};
}
} else
global.db.data.chats[m.chat] = {
isBanned: false,
welcome: true,
detect: true,
sWelcome: '',
sBye: '',
sPromote: '',
sDemote: '', 
sCondition: '', 
sAutorespond: '', 
delete: false,
modohorny: true,
stickers: false,
autosticker: false,
audios: false,
antiver: true,
antiPorn: true,
antiLink: false,
antiLink2: false,
antiTiktok: false,
antiYoutube: false,
antiTelegram: false,
antiFacebook: false,
antiInstagram: false,
antiTwitter: false,
antiDiscord: false,
antiThreads: false,
antiTwitch: false,
antifake: false,
reaction: true,
viewonce: false,
modoadmin: false,
autorespond: true,
antitoxic: true,
game: true, 
game2: true, 
simi: false,
antiTraba: true,
primaryBot: null,
autolevelup: true,
expired: 0,
horarioNsfw: {
inicio: "00:00", 
fin: "23:59"
}
}
let settings = global.db.data.settings[this.user.jid]
if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
if (settings) {
if (!('self' in settings)) settings.self = false
if (!('autoread' in settings)) settings.autoread = false
if (!('autoread2' in settings)) settings.autoread2 = false
if (!('restrict' in settings)) settings.restrict = false
if (!('temporal' in settings)) settings.temporal = false
if (!('anticommand' in settings)) settings.anticommand = false
if (!('antiPrivate' in settings)) settings.antiPrivate = false
if (!('antiCall' in settings)) settings.antiCall = true
if (!('antiSpam' in settings)) settings.antiSpam = true 
if (!('modoia' in settings)) settings.modoia = false
if (!('jadibotmd' in settings)) settings.jadibotmd = true 
if (!('prefix' in settings)) settings.prefix = opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@';
} else global.db.data.settings[this.user.jid] = {
self: false,
autoread: false,
autoread2: false,
restrict: false,
temporal: false,
antiPrivate: false,
antiCall: true,
antiSpam: true,
modoia: false, 
anticommand: false, 
prefix: opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@',
jadibotmd: true,
}} catch (e) {
console.error(e)
}

var settings = global.db.data.settings[this.user.jid]
const prefix = new RegExp('^[' + settings.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');  
const isROwner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isOwner = isROwner || m.fromMe
const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
//const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isPrems = isROwner || global.db.data.users[m.sender].premiumTime > 0

if (opts['queque'] && m.text && !(isMods || isPrems)) {
let queque = this.msgqueque, time = 1000 * 5
const previousID = queque[queque.length - 1]
queque.push(m.id || m.key.id)
setInterval(async function () {
if (queque.indexOf(previousID) === -1) clearInterval(this)
await delay(time)
}, time)
}

if(m.id.startsWith('NJX-') || m.id.startsWith('Lyru-') || m.id.startsWith('EvoGlobalBot-') || m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') || m.id.startsWith('8SCO') && m.id.length === 20 || m.id.startsWith('FizzxyTheGreat-')) return

if (opts['nyimak']) return
if (!isROwner && opts['self']) return 
if (opts['pconly'] && m.chat.endsWith('g.us')) return
if (opts['gconly'] && !m.chat.endsWith('g.us')) return
if (opts['swonly'] && m.chat !== 'status@broadcast') return
if (typeof m.text !== 'string')
m.text = ''
	
m.exp += Math.ceil(Math.random() * 10)
let usedPrefix
let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
const participants = (m.isGroup ? groupMetadata.participants : []) || []
const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {}
const isRAdmin = user?.admin == 'superadmin' || false
const isAdmin = isRAdmin || user?.admin == 'admin' || false //user admins? 
const isBotAdmin = bot?.admin || false //Detecta sin el bot es admin
m.isWABusiness = global.conn.authState?.creds?.platform === 'smba' || global.conn.authState?.creds?.platform === 'smbi'
m.isChannel = m.chat.includes('@newsletter') || m.sender.includes('@newsletter')
	
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
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
m.reply(`⎙ ERROR_COMMAND ⎙\n• _Comando erroneo detectado._\n\n❒ *Plugin:* ${name}\n❒ *Action:* ${m.text}\n❒ *ERROR:* \n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
}}}
if (!opts['restrict'])
if (plugin.tags && plugin.tags.includes('admin')) {

continue
}
const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : prefix; // Usamos prefix local
let match = (_prefix instanceof RegExp ?
    [[_prefix.exec(m.text), _prefix]] :
    Array.isArray(_prefix) ?
    _prefix.map(p => {
        let re = p instanceof RegExp ? p : new RegExp(str2Regex(p));
        return [re.exec(m.text), re];
    }) :
    typeof _prefix === 'string' ?
    [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
    [[[], new RegExp]]
).find(p => p[1]);
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
    })) continue;
}
if (typeof plugin !== 'function') continue;
if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '');
    let [command, ...args] = noPrefix.trim().split` `.filter(v => v);
    args = args || [];
    let _args = noPrefix.trim().split` `.slice(1);
    let text = _args.join` `;
    command = (command || '').toLowerCase();
    let fail = plugin.fail || global.dfail;
    let isAccept = plugin.command instanceof RegExp ?
        plugin.command.test(command) :
        Array.isArray(plugin.command) ?
        plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
        typeof plugin.command === 'string' ?
        plugin.command === command :
        false;

    if (!isAccept) continue;
    m.plugin = name;
if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
if (!['owner-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return 
if (m.text && user.banned && !isROwner) {
if (user.antispam > 2) return
m.reply(`[ BANEADO ]`)
user.antispam++	
return
}

//Antispam 2		
if (user.antispam2 && isROwner) return
let time = global.db.data.users[m.sender].spam + 3000
if (new Date - global.db.data.users[m.sender].spam < 3000) return console.log(`[ SPAM ]`) 
global.db.data.users[m.sender].spam = new Date * 1
}
		
let hl = _prefix 
let adminMode = global.db.data.chats[m.chat].modoadmin
let mdmx = `${plugins.botAdmin || plugins.admin || plugins.group || plugins || noPrefix || hl ||  m.text.slice(0, 1) == hl || plugins.command}`
if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin && mdmx) return   
if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { //número bot owner
fail('owner', m, this)
continue
}
if (plugin.rowner && !isROwner) { //Owner
fail('rowner', m, this)
continue
}
if (plugin.owner && !isOwner) { //Propietario/Owner
fail('owner', m, this)
continue
}
if (plugin.mods && !isMods) { // Moderator
fail('mods', m, this)
continue
}
if (plugin.premium && !isPrems) { // Premium
fail('premium', m, this)
continue
}
if (plugin.group && !m.isGroup) { //Solo el grupo
fail('group', m, this)
continue
} else if (plugin.botAdmin && !isBotAdmin) { //Detecta si el bot es admins
fail('botAdmin', m, this)
continue
} else if (plugin.admin && !isAdmin) { //admins
fail('admin', m, this)
continue
}
if (plugin.private && m.isGroup) { //Solo chat privado
fail('private', m, this)
continue
}
if (plugin.register == true && _user.registered == false) { // user registrado? 
fail('unreg', m, this)
continue
}

m.isCommand = true
let xp = 'exp' in plugin ? parseInt(plugin.exp) : 10 // Ganancia de XP por comando
if (xp > 2000)
m.reply('Exp limit') // Hehehe
else   
if (!isPrems && plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
this.sendMessage(m.chat, {text: `✘ No tienes suficientes recuesos para usar este comando.`}, {quoted: m})
continue     
}
			
m.exp += xp
if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
this.sendMessage(m.chat, {text: `✘ No tienes suficientes recursos para usar este comando.`}, {quoted: m})
continue //Sin límite
}
if (plugin.level > _user.level) {
this.sendMessage(m.chat, {text: `✘ No tienes el nivel suficiente para usar este comando.\n- El nivel requerido es ${plugin.level} y tu nivel es ${_user.level}.\n\n• *Puedes usar el comando #levelup para subir de nivel.*`}, {quoted: m})
continue // Si no se ha alcanzado el nivel
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
m.limit = m.limit || plugin.limit || false
m.money = m.money || plugin.money || false
} catch (e) {
// Error occured
m.error = e
console.error(e)
if (e) {
let text = format(e) || 'Error desconocido';
for (let api in global.APIs) {
let key = global.APIs[api].key;
if (key) text = text.replace(new RegExp(key, 'g'), '#HIDDEN#');
}
/*if (e) {
let text = format(e)
for (let key of Object.values(global.APIKeys))
text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')*/
if (e.name)
for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
let data = (await conn.onWhatsApp(jid))[0] || {}
if (data.exists)
m.reply(`⎙ ERROR_COMMAND ⎙\n• _Comando erroneo detectado._\n\n❒ *Plugin:* ${name}\n❒ *Action:* ${m.text}\n❒ *ERROR:* \n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
}
m.reply(text)
}} finally {
// m.reply(util.format(_user))
if (typeof plugin.after === 'function') {
try {
await plugin.after.call(this, m, extra)
} catch (e) {
console.error(e)
}}
if (m.limit)
//m.reply('Gastaste diamantes.')
}
if (m.money)
//m.reply('Gastaste monedas.')  
break
}}} catch (e) {
console.error(e)
} finally {
if (opts['queque'] && m.text) {
const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
if (quequeIndex !== -1)
this.msgqueque.splice(quequeIndex, 1)
}
//console.log(global.db.data.users[m.sender])
let user, stats = global.db.data.stats
if (m) { let utente = global.db.data.users[m.sender]
if (utente.muto == true) {
let bang = m.key.id
let cancellazzione = m.key.participant
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: cancellazzione }})
}
if (m.sender && (user = global.db.data.users[m.sender])) {
user.exp += m.exp
user.limit -= m.limit * 1
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

	    
if (db.data.chats[m.chat].reaction && m.text.match(/(ción|dad|aje|oso|izar|mente|pero|tion|age|ous|ate|and|but|ify)/gi)) {
let emot = pickRandom([
"📝", "🛑", "🎳", "🏆", "🎖️", "🏅", 
"🍿", "🍔", "🌮", "🍇", "💧", "⬇️", 
"👤", "🤍", "✅", "⏰", "🌎", "⬆️", 
"💣", "🕳️", "🌬️", "🎨", "🐦", "📍", 
"❤️", "🧿", "✨", "🍿", "🚺", "🧧", 
"🍦", "😎", "🛠️", "🌹", "☁️", 🗿", 
"🍫", "🍹", "🍸", "🍍", "🎋", "🎏", 
"🍰", "🎂", "🍷", "🍊", "🎆", "🎇"])
if (!m.fromMe) return this.sendMessage(m.chat, { react: { text: emot, key: m.key }})
}
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)]}
}}

/**
 * Handle groups participants update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
if (opts['self'])
return
if (this.isInit)
return
if (global.db.data == null)
await loadDatabase()
let chat = global.db.data.chats[id] || {}
let text = ''
switch (action) {
case 'add':
case 'remove':
if (chat.welcome) {
let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
for (let user of participants) {
let pp = global.mxImagens
try {
pp = await this.profilePictureUrl(user, 'image')
} catch (e) {
} finally {
let apii = await this.getFile(pp)  
const botTt2 = groupMetadata.participants.find(u => this.decodeJid(u.id) == this.user.jid) || {} 
const isBotAdminNn = botTt2?.admin === "admin" || false
text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '😻 𝗦𝘂𝗽𝗲𝗿 𝗚𝗮𝘁𝗮𝗕𝗼𝘁-𝗠𝗗 😻') :
(chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
			    
if (chat.antifake && isBotAdminNn && action === 'add') {
const prefijosPredeterminados = [2, 4, 6, 7, 8, 9] // Puedes personalizar los prefijos de los usuarios que deseas eliminar, especificando los que deben ser bloqueados si el número empieza con alguno de ellos.
let prefijos = (Array.isArray(chat.sCondition) && chat.sCondition.length > 0) || chat.sCondition !== "" ? chat.sCondition : prefijosPredeterminados
const comienzaConPrefijo = prefijos.some(prefijo => user.startsWith(`+${prefijo}`))
if (comienzaConPrefijo) {
let texto = mid.mAdvertencia + mid.mFake2(user)
await conn.sendMessage(id, { text: texto, mentions: [user] })
if (m.key.participant && m.key.id) {
await conn.sendMessage(id, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }})
}
}}
	
let fkontak2 = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${user.split('@')[0]}:${user.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }      
this.sendMessage(id, { text: text, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[user],
"externalAdReply": {
"showAdAttribution": false,
"renderLargerThumbnail": false,
"thumbnail": apii.data, 
"title": textoInfo,
"containsAutoReply": true,
"mediaType": 1, 
sourceUrl: 'https://mdmx-wa.vercel.app' }}}, { quoted: fkontak2 })
apii.data = ''
//this.sendFile(id, apii.data, 'pp.jpg', text, null, false, { mentions: [user] }, { quoted: fkontak2 })
}}}
			    
break
case 'promote':
case 'daradmin':
case 'darpoder':
text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
case 'demote':
case 'quitarpoder':
case 'quitaradmin':
if (!text)
text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
text = text.replace('@user', '@' + participants[0].split('@')[0])
if (chat.detect)
//this.sendMessage(id, { text, mentions: this.parseMention(text) })
break
}}

/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
if (opts['self'] && !isOwner && !isROwner)
return
for (const groupUpdate of groupsUpdate) {
const id = groupUpdate.id
if (!id) continue
let chats = global.db.data?.chats?.[id], text = ''
if (!chats?.detect) continue
// if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
//if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
//if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
//if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
if (!text) continue
await this.sendMessage(id, { text, mentions: this.parseMention(text) })
}}

export async function callUpdate(callUpdate) {
let isAnticall = global.db.data.settings[this.user.jid].antiCall  
if (!isAnticall) return
for (let nk of callUpdate) { 
if (nk.isGroup == false) {
if (nk.status == "offer") {
let callmsg = await this.reply(nk.from, `● Hola @${nk.from.split('@')[0]}, las ${nk.isVideo ? 'llamadas' : 'video llamadas'} no estan permidas realizarse en este chat.`, false, { mentions: [nk.from] })
//let data = global.owner.filter(([id, isCreator]) => id && isCreator)
//await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
await this.updateBlockStatus(nk.from, 'block')
}}}}

export async function deleteUpdate(message) {
try {
const { fromMe, id, participant, remoteJid } = message
if (fromMe) return 
let msg = this.serializeM(this.loadMessage(id))
console.log(msg)
let chat = global.db.data.chats[msg?.chat] || {}
if (!chat?.delete) return 
if (!msg) return 
let isGroup = remoteJid.endsWith('@g.us')
let isPrivate = !isGroup && remoteJid.endsWith('@s.whatsapp.net')
if (!isGroup && !isPrivate) return
const antideleteMessage = `
【 *I N F O R M A C I O N* 】
- _El participante_ @${participant.split('@')[0]}, _ha eliminado un mensaje recientemente._
_Sera reenviado, no se admite eliminar mensajes en este chat._
`.trim();
await this.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
} catch (e) {
console.error(e)
}}

global.dfail = (type, m, conn) => {
let msg = {
rowner: `● _Lo siento, este comando solo puede ser utilizado por el propietario del bot._`,
owner: `● _Lo siento, este comando solo puede ser utilizado por los administradores del bot y el propietario._`,
mods: `● _Lo siento, este comando solo puede ser utilizado por los usuarios moderadores del bot._`,
premium: `● _Lo siento, este comando solo puede ser utilizado por los usuarios premium del bot._`,
group: `● _Lo siento, este comando solo puede ser utilizado unicamente en chats grupales._\n- _Entra a un chat grupal donde este el bot para usarlo._`,
private: `● _Lo siento, este comando solo puede ser utilizado unicamente en chats individuales._\n- _Entra al chat privado del bot para usarlo._`,
admin: `● _Lo siento, este comando solo puede ser utilizado por los administradores grupales._`,
botAdmin: `● _Lo siento, este comando solo puede ser utilizado si el bot es admin de este grupo._\n- _No puede realizar acciones que solo los administradores pueden hacer._`,
unreg: `● _Para usar este comando, es importante registrarte para continuar._\n- _Esto se desbloqueara para todos los demas comandos que requieran registro._\n\n• *Puedes usar el siguiente comando para registrarte:*\n#register`,
restrict: `● _Lo siento, este comando esta bajo restriccion, no se puede utilizar a menos que el propietario lo permita._`,
}[type]
	

if (msg) return conn.sendMessage(m.chat, {text: msg}, { quoted: m })
}

const file = global.__filename(import.meta.url, true);
watchFile(file, async () => {
unwatchFile(file)
console.log(chalk.greenBright('Update \'handler.js\''));
//if (global.reloadHandler) console.log(await global.reloadHandler());
})