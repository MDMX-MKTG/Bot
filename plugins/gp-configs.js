let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || mxLogo
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba el tipo de accion para realizar en el grupo._\n\n• *Por ejemplo:*\n#${command} cerrar\n#${command} abrir` }, { quoted: m })
await conn.groupSettingUpdate(m.chat, isClose)
  
if (isClose === 'not_announcement'){
conn.sendMessage(m.chat, { text: `✓ _El grupo se ha abierto con exito, ahora todos pueden hablar._` }, { quoted: m })
}
  
if (isClose === 'announcement'){
conn.sendMessage(m.chat, { text: `✓ _El grupp se ha cerrado con exito, solo los administradores pueden hablar._` }, { quoted: m })
}}
handler.command = /^(group|grupo|g)$/i
handler.admin = true
handler.botAdmin = true
export default handler
