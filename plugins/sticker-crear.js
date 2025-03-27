import { sticker } from '../lib/sticker.js'
//import uploadFile from '../lib/uploadFile.js'
//import uploadImage from '../lib/uploadImage.js'
//import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {

let stiker = false
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 10) return conn.sendMessage(m.chat, { text: `𔒝 _El video no puede durar mas de 10 segundos, recorta el video y intentalo de nuevo._` }, { quoted: m }) //Texto.
let img = await q.download?.()

if (!img) return conn.sendMessage(m.chat, { text: `𔒝 _Responda a un video o imagen para crear un sticker._` }, { quoted: m }) //Texto.

let out
try {
stiker = await sticker(img, false, global.wm, global.author)
} catch (e) {
console.error(e)
} finally {
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.wm, global.author)
}}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.wm, global.author)

else return conn.sendMessage(m.chat, { text: `𔒝 _El enlace ingresado es incorrecto, tiene que tener el ultimo formato de jpg, jpeg o png._` }, { quoted: m }) //Texto.

}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: textoInfo, mediaType: 2, sourceUrl: null, thumbnail: img}}}, { quoted: m })

else return conn.sendMessage(m.chat, { text: `𔒝 _Responda a un video o imagen para crear un sticker._` }, { quoted: m }) //Texto.


}}

handler.command = ['s', 'sticker', 'stiker']
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
