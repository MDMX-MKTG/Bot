import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, text }) => {
let mxPlugins = 'downs-facebook'
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace de un video de *Facebook* para descargarla._` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, { text: `_Descargando el video de *Facebook*, espere un momento..._` }, { quoted: m })
try {
let api = await fetch(`https://vapis.my.id/api/fbdl?url=${text}`)
let json = await api.json()
let { title, durasi, hd_url } = json.data
let VidBuffer = await getBuffer(hd_url)
let Jose = `
⫶☰ \`F A C E B O O K\`

⊃ *Título:* ${title}
⊃ *Duracion:* ${durasi}
`

await conn.sendMessage(m.chat, { video: VidBuffer, mimetype: "video/mp4", caption: Jose }, { quoted: m });
} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.error(error)
}}

handler.command = ['fbdl', 'fb', 'facebook', 'facebookdl']

export default handler

const getBuffer = async (url, options = {}) => {
const res = await axios({ method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1}, ...options, responseType: 'arraybuffer'})
return res.data
}
