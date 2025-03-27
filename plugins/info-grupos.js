let handler = async (m, { conn, command }) => {
let creador = `
⫶☰ \`G R U P O S\`
> _Grupos principales del propietario._

No se han agregado grupos.
`
awat conn.sendMessage(m.chat, { text: creador }, { quoted: m })
}
handler.command = /^grupos|comunidad$/i
export default handler
