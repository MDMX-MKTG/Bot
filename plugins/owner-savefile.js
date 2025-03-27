import fs from 'fs'
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y responda a un mensaje con codigo *JS* mas el nombre para guardarlo en plugins._\n\n• *Por ejemplo:*\n#${command} owner.js` }, { quoted: m })
try {
if (!m.quoted.text) return conn.sendMessage(m.chat, { text: `𔒝 _Por favor, responda a un mensaje con el comando._` }, { quoted: m })
let path = `./plugins/${text}.js`
await fs.writeFileSync(path, m.quoted.text)
conn.sendMessage(m.chat, { text: `✓ _Se ha guardado el *${text}.js* con exito en los plugins._` }, { quoted: m })
} catch {
await conn.sendMessage(m.chat, { text: `𔒝 _Favor de responder a un mensaje con codigo *JS*._` }, { quoted: m })
}}
handler.command = ["+plugin", "savejs", "pg+"]
handler.owner = true
export default handler