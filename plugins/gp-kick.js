const handler = async (m, {conn, participants, usedPrefix, command}) => {
if (!global.db.data.settings[conn.user.jid].restrict) return conn.sendMessage(m.chat, {text: `⦗ ✘ ⦘ _Lo siento, este comando solo puede ser ejecutado si las restricciones en este proyecto esten activas._`}, { quoted: m })
if (!m.mentionedJid[0] && !m.quoted) return conn.sendMessage(m.chat, {text: `𔒝 _Ingrese el comando y mensione a una persona para eliminarlo del grupo._`}, { quoted: m })
if (m.mentionedJid.includes(conn.user.jid)) return
const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
const owr = m.chat.split`-`[0]
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
await conn.sendMessage(m.chat, {text: `✓ _¡Eliminado con exito!_`}, { quoted: m })
}
handler.command = /^(sacar|-user|kick)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
