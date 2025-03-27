import axios from 'axios'

let handler = async (m, { conn, text, command, usedPrefix }) => {
let mxPlugins = 'ajustes-imagine'
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba lo que quiera para crear una imagen_\n\n» *Por ejemplo:*\n${usedPrefix + command} Un gato.` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, { text: `Voy a intentar crear eso, espere un momento...` }, { quoted: m })
try {
let img = await axios.get(`https://api.agungny.my.id/api/text2img?prompt=${text}`, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { image: Buffer.from(img.data), caption: `` }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.error(error)
}}

//handler.customPrefix = /@+54 9 3873 65-5135|@+5493873655135|@imagina/i
handler.command = ["imagina", "imagine"]
  //new RegExp

export default handler
