import axios from 'axios'
let handler = async (m, { conn, text, command, usedPrefix }) => {
let mxPlugins = 'ajustes-chatgpt'
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba cualquier cosa para hablar con *ChatGPT*._\n\n» *Por ejemplo:*\n${usedPrefix + command} Hola ¿Como estas?` }, { quoted: m }) //Texto.
try {
let api = await axios.get(`https://api.agungny.my.id/api/chatgpt?q=${text}`)
let json = api.data
conn.sendMessage(m.chat, { text: json.result }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.error(error)
}}

handler.command = ['chatgpt', 'gpt']
export default handler
  
