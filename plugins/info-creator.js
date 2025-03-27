let handler = async (m, { conn, command }) => {
let creador = `
⫶☰ \`C R E A T O R\`
> _Numero del propietario principal._

● *WhatsApp:*
- https://wa.me/584245610338
`
awat conn.sendMessage(m.chat, { text: creador }, { quoted: m })
}
handler.command = /^creador|creator$/i
export default handler
