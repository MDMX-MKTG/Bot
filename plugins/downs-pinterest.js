import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { conn, text }) => {
let mxPlugins = 'downs-pinterest'
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace de un video o imagen de *Pinterest* para descargarlo._` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, { text: `_Descargando, espere un momento..._` }, { quoted: m })
try {
let { tipo, titulo, imagen, author, dl_url } = await Pinterest.download(text)
let Jose = `
⫶☰ \`P I N T E R E S T\`

⊃ *Titulo:* ${titulo}
⊃ *Creador:* ${author}
⊃ *Formato:* ${tipo}
`
if (tipo === "imagen") {
await conn.sendMessage(m.chat, { image: { url: dl_url }, caption: Jose }, { quoted: m })
} else if (tipo === "video") {
await conn.sendMessage(m.chat, { video: { url: dl_url }, caption: Jose }, { quoted: m })
}} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.error(error)    
}}

handler.command = ['pinterest', 'pints']

export default handler

const Pinterest = {
download: async function(url) {
try {
let response = await axios.get(url, {headers: {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" }, }).catch((e) => e.response)
let $ = cheerio.load(response.data)
let tag = $('script[data-test-id="video-snippet"]')
if (tag.length > 0) {
let result = JSON.parse(tag.text())
if (
!result ||
!result.name ||
!result.thumbnailUrl ||
!result.uploadDate ||
!result.creator
) { return { msg: "Error :(" } }
return {
tipo: 'video',
titulo: result.name || '-',
imagen: result.thumbnailUrl,
author: { name: result.creator.alternateName, username: "@" + result.creator.name, url: result.creator.url },
dl_url: result.contentUrl,
}
} else {
let json = JSON.parse($("script[data-relay-response='true']").eq(0).text());
let result = json.response.data["v3GetPinQuery"].data;
return {
tipo: 'imagen',
titulo: result.title,
author: { name: result.pinner.username, username: "@" + result.pinner.username },
dl_url: result.imageLargeUrl,
}}
} catch (e) {
console.error(e)
return { msg: "error :(" }
}}}
