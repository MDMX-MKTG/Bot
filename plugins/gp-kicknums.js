
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
let mxPlugins = 'gp-kicknums'
if (!args[0]) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba el codigo de pais para buscarlos en este grupo._\n\n• *Por ejemplo:*\n#${command} 54` }, { quoted: m })
if (isNaN(args[0])) return conn.sendMessage(m.chat, {text: `𔒝 _Debe de ingresar el numero principal del cualquier pais para ver si estan en este grupo._\n\n• *Por ejemplo:*\n#${command} 52`}, { quoted: m })
let lol = args[0].replace(/[+]/g, '')
let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol)) 
let bot = global.db.data.settings[conn.user.jid] || {}
if (ps == '') return conn.sendMessage(m.chat, {text: `● _No se han encontrado los numeros que inicien con ( *+${lol}* ), intenta con otro numero._`}, { quoted: m })
let numeros = ps.map(v=> '• @' + v.replace(/@.+/, ''))
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "dnums": 
conn.sendMessage(m.chat, {text: `𔒝 _Aqui esta la lista encontrada en este grupo._\n\n*Numeros:* ≻ +${lol}\n\n*Listado:*\n` + numeros.join`\n`, mentions: conn.parseMention(ps)}, { quoted: m })
break 
case "kicknrs": 
if (!bot.restrict) return conn.sendMessage(m.chat, {text: `⦗ ✘ ⦘ _Lo siento, este comando solo puede ser ejecutado si las restricciones de este proyecto esten activas._`}, { quoted: m })
if (!isBotAdmin) return conn.sendMessage(m.chat, {text: `⦗ ✘ ⦘ _Lo siento, si no soy un administrador, no puedo realizar eliminaciones, tengo que ser administrador para realizar esta accion._`}, { quoted: m })
conn.sendMessage(m.chat, {text: `✓ _La accion fue confirmada, se eliminaran los numeros con iniciales ( *+${lol}* ), cada 10 o 15 segundos se eliminara uno por uno._`}, { quoted: m })
let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol))
for (let user of users) {
let error = `⦗ ✘ ⦘ _El participante:_ @${user.split("@")[0]} _ya fue eliminado o salio del grupo._` 
if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) { 
await delay(2000)    
let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
if (responseb[0].status === "404") conn.sendMessage(m.chat, { text: error, mentions: conn.parseMention(error)}, { quoted: m })
await delay(10000)
} else return conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
break
}}
handler.command = /^(dnums|kicknrs)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler

