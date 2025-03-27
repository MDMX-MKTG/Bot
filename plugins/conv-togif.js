let handler = async (m, { conn, usedPrefix, command }) => {
let mxPlugins = 'conv-togif'
if (!m.quoted) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y responda a un video para convertirlo en un gif._` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, { text: `_Convirtiendo video a gif, espere un momento..._` }, { quoted: m })
const q = m.quoted || m
let mime = (q.msg || q).mimetype || ''
if (!/(mp4)/.test(mime)) return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _El formato no es compatible, debe de responder a un video para convertirlo en gif._` }, { quoted: m })
let media = await q.download()
conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: wm }, { quoted: m })
}
handler.command = ['togif']
export default handler
