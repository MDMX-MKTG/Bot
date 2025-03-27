import fetch from 'node-fetch'
let handler = async(m, { conn, text, command, usedPrefix }) => {
let mxPlugins = 'ajustes-gemini'
if (!text) {
return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba lo que quiera para hablar con *Gemini*._\n\n» *Por ejemplo:*\n${usedPrefix + command} Hola ¿Como estas?` }, { quoted: m }) //Texto.
}
try {
let api = await fetch(`https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${text}`)
let json = await api.json()
conn.sendMessage(m.chat, { text: json.result }, { quoted: m })
} catch (error) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
console.error(error)
}}
handler.command = /^(gemini|bard)$/i
export default handler
