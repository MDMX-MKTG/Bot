let handler = async (m, { conn,usedPrefix, text, command }) => {
if(isNaN(text) && !text.match(/@/g)){
	
}else if(isNaN(text)) {
var number = text.split`@`[1]
}else if(!isNaN(text)) {
var number = text
}
	
if (!text && !m.quoted) return conn.sendMessage(m.chat, { text: `𔒝 _Mensione a un usuario admin para descartarlo como admin grupal._` }, { quoted: m })
if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.sendMessage(m.chat, { text: `𔒝 _Debes de mensionar a un administrador para descartarlo como admin._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `_Procesando orden..._` }, { quoted: m })
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
}} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'demote')
conn.sendMessage(m.chat, { text: `✓ _El usuario mensionado ya no es un administrador en este grupo._` }, { quoted: m })
}}
handler.command = /^(demote|dm)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
