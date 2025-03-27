import { webp2png } from '../library/webp2mp4.js'
let handler = async (m, { conn, usedPrefix, command }) => {
const q = m.quoted || m
const mime = q.mediaType || ''
if (!/sticker/.test(mime)) return conn.sendMessage(m.chat, { text: `𔒝 _Responda a un sticker para convertirlo en una imagen._` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, {text: `_Procesando, espere un momento..._`}, {quoted: m})
const media = await q.download()
let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
await conn.sendMessage(m.chat, { image: { url: out }, caption: wm }, { quoted: m })
//await conn.sendFile(m.chat, out, 'error.png', 'Aqui tiene su imagen.', { quoted: m })
}
handler.command = ['timg', 'jpg']
export default handler
