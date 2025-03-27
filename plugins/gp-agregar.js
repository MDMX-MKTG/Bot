let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let who 
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
let name = await conn.getName(m.sender)
let user = global.db.data.users[who]
if (!global.db.data.settings[conn.user.jid].restrict) return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Lo siento, este comando solo puede ser ejecutado si las restricciones en este proyecto este activas._` }, { quoted: m })
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el numero de telefono de la persona para invitarlo al grupo._\n\n» *Por ejemplo:*\n${usedPrefix + command} 5493873655135` }, { quoted: m }) //Texto.
if (text.includes('+')) return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _El numero que has ingresado no es valido o esta mal escrito._\n- _Recuerde que no debe contener el simbolo internacional *( + )* para escribir el numero._\n\n• *Por ejemplo:*\n#${command} 5493873655135` }, { quoted: m })
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
await conn.reply(text+'@s.whatsapp.net', `- *_¡Hola!_*\n- _Alguien te ha invitado a unirte a un grupo._\n\n• ¡Te estamos esperando!\n- ${link}`, m, {mentions: [m.sender]})
conn.sendMessage(m.chat, { text: `✓ _Se ha enviado el enlace de invitacion con exito al numero:_ @${who.split`@`[0]}`, mentions: [who] }, { quoted: m })
}
handler.command = /^(add|añadir)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
export default handler
