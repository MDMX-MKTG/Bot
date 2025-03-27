
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba el problema, opinion o duda para que podamos contestarte._` }, { quoted: m })
if (text.length < 8) return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Tienes que escribir al menos 10 caracteres para poder enviar el reporte, intentalo de nuevo._` }, { quoted: m })
if (text.length > 2000) conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _El maximo de caracteristicas es de 2000, vuelva a intentarlo con un texto corto._` }, { quoted: m })
let teks = `
🜲 *\`R E P O R T E\`* 🜲
*Usuario:* @${m.sender.split`@`[0]}
·───────────────·
» ${text}
`
conn.reply('5493873655135@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
contextInfo: { mentionedJid: [m.sender] }})
conn.reply('584245610338@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
contextInfo: { mentionedJid: [m.sender] }})
conn.reply('5493873655168@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
contextInfo: { mentionedJid: [m.sender] }})
conn.sendMessage(m.chat, { text: `✓ _El reporte fue enviado con exito, tendra respuestas tan pronto como sea posible._` }, { quoted: m })
}
handler.command = /^(reporte|opinar|suggest)$/i 
export default handler
