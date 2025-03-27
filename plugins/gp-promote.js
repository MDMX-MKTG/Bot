let handler = async (m, { conn,usedPrefix, command, text }) => {
if(isNaN(text) && !text.match(/@/g)){

}else if(isNaN(text)) {
var number = text.split`@`[1]
}else if(!isNaN(text)) {
var number = text
}

if(!text && !m.quoted) return conn.sendMessage(m.chat, {text: `𔒝 _Mensione a una persona para asignarlo como admin del grupo._`}, { quoted: m })
if(number.length > 13 || (number.length < 11 && number.length > 0)) return conn.sendMessage(m.chat, {text: `𔒝 _Debe de ingresar el comando y mensionar a una persona para asignarlo como admin en el grupo._`}, { quoted: m })
	
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} } catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'promote')
conn.sendMessage(m.chat, {text: `✓ _El participante mensionado ahora es admin del grupo._`}, { quoted: m })
}}
handler.command = /^(promote|adm)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler 
