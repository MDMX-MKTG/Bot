let linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i

export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let delet = m.key.participant
let bang = m.key.id
let bot = global.db.data.settings[this.user.jid] || {}
const isGroupLink = linkRegex.exec(m.text)
const grupo = `https://chat.whatsapp.com`
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return conn.sendMessage(m.chat, { text: `⫶☰ \`A N T I  -  L I N K\`\n> _La opcion de anti link esta activa, favor de no mandar enlaces grupales._` }, { quoted: m })
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
if (m.text.includes(linkThisGroup)) return !0
}
await conn.sendMessage(m.chat, { text: `⫶☰ \`A N T I  -  L I N K\`\n- _Acabas de mandar un enlace grupal, seras eliminado de inmediato.` }, { quoted: m })
if (!isBotAdmin) return conn.sendMessage(m.chat, { text: `𔒝 _Lo siento, no soy admin para realizar esta accion._` }, { quoted: m }) //Texto.
if (isBotAdmin) {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
} else if (!bot.restrict) return conn.sendMessage(m.chat, { text: `𔒝 _Lo siento, no puedo realizar esta accion si las restricciones del bot estan desactivadas._` }, { quoted: m }) //Texto.
}
return !0

}
