import fg from 'api-dylux'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let mxPlugins = 'downs-twitter'
if (!args[0]) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace de un video de *Twitter* para descargarlo._` }, { quoted: m }) //Texto.
await conn.sendMessage(m.chat, { text: `_Descargando el video, espere un momento..._` }, { quoted: m })
try {
let { SD, HD, desc, thumb, audio } = await fg.twitter(args[0])
let jose = `
⫶☰ \`T W I T T E R\`

⊃ *Bot:* ${wm}
⊃ *Version:* ${vs}
⊃ *Descripcion:* ${desc}`
conn.sendMessage(m.chat, { video: { url: HD }, caption: jose }, { quoted: m })
//conn.sendFile(m.chat, HD, 'twitter.mp4', te, m)
} catch (e) {
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m })
} 
}
handler.command = ['twitter', 'tw', 'x']
export default handler