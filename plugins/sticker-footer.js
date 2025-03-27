import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.sendMessage(m.chat, { text: `𔒝 _Responda a un sticker para cambiar su descripcion._` }, { quoted: m }) //Texto.
  let stiker = false
  try {
   await m.react(rwait)
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return conn.sendMessage(m.chat, { text: `𔒝 _Formato no compatible, recuerde responder a un sticker sin movimiento._` }, { quoted: m }) //Texto.
    let img = await m.quoted.download()
    if (!img) return conn.sendMessage(m.chat, { text: `𔒝 _Responda a un sticker con una barra para cambiar el nombre o descripcion._\n\n» *Por ejemplo:*\n${usedPrefix + command} Jose|Js` }, { quoted: m }) //Texto.
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
  // await conn.reply(m.chat, global.wait, m)
     if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: textoInfo, mediaType: 2, sourceUrl: null, thumbnail: img}}}, { quoted: m })

     throw 'ERROR'
  }
}

handler.command = ['sc', 'wm'] 

export default handler
