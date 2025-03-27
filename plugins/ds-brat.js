import axios from 'axios'
let handler = async (m, { conn, text, command, usedPrefix }) => {
let mxPlugins = 'ds-brat'
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Escriba el texto que quiera para crear un sticker._\n\n» *Por ejemplo:*\n${usedPrefix + command} Es un meme creo, no lo se.` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, { text: `_Procesando solicitud, espere un momento..._` }, { quoted: m })
try {
let api = await axios.get(`https://vapis.my.id/api/bratv1?q=${text}`, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { sticker: Buffer.from(api.data) }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.error(error)
}}

handler.command = ['brat']
export default handler
