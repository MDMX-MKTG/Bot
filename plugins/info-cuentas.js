let handler = async (m, { conn, command }) => {
let creador = `
⫶☰ \`C U E N T A S\`
> _Cuentas principales del propietario._

No se han agregado cuentas.
`
awat conn.sendMessage(m.chat, { text: creador }, { quoted: m })
}
handler.command = /^cuentas|redes$/i
export default handler
