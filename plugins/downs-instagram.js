import axios from 'axios'
let handler = async (m, { conn, usedPrefix, args, command, text }) => {
let mxPlugins = 'downs-instagram'
if (!args[0]) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace de un video o imagen de *Instagram* para descargarlo._` }, { quoted: m }) //Texto.
if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _El enlace que has ingresado no es valido, recuerda ingresar un enlace valido de un video o imagen de *Instagram*._` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `_Descargando el contenido de *Instagram*, espere un momento..._` }, { quoted: m })
try {
let api = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`)
for (let a of api.data.data) {
if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
await conn.sendMessage(m.chat, { image: { url: a.url }, caption: `⫶☰ \`I N S T A G R A M\`\n\n⊃ *Bot:* ${wm}\n⊃ *Fecha:* ${botdate}\n⊃ *Formato:* Imagen` }, { quoted: m })
} else {
await conn.sendMessage(m.chat, { video: { url: a.url }, caption: `⫶☰ \`I N S T A G R A M\`\n\n⊃ *Bot:* ${wm}\n⊃ *Fecha:* ${botdate}\n⊃ *Formato:* Video` }, { quoted: m })
}}
} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.log(error)
}}
handler.command = /^(instagram|ig)$/i
export default handler
