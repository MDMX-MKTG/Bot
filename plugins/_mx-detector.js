let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || mxLogo  

let nombre, foto, edit, newlink, status, admingp, noadmingp
nombre = `⫶☰ \`I N F O R M A C I O N\`\n- El participante ${usuario} ha cambiado el nombre grupal recientemente.`
foto = `⫶☰ \`I N F O R M A C I O N\`\n- El participante ${usuario} ha cambiado la imagen grupal recientemente.`
edit = `⫶☰ \`I N F O R M A C I O N\`\n- El admin ${usuario} ha actualizado el grupo para que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo.`
newlink = `⫶☰ \`I N F O R M A C I O N\`\n- El admin ${usuario} ha restablecido el enlace grupal recientemente.`
status = `⫶☰ \`I N F O R M A C I O N\`\n- El admin ${usuario} ha ${m.messageStubParameters[0] == 'on' ? 'cerrado' : 'abierto'} el grupo, ahora ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} pueden enviar mensaje.`
admingp = `⫶☰ \`I N F O R M A C I O N\`\n- El admin ${usuario} ha asignado como admin a @${m.messageStubParameters[0].split`@`[0]}`
noadmingp =  `⫶☰ \`I N F O R M A C I O N\`\n- El admin ${usuario} ha descartado como admin a @${m.messageStubParameters[0].split`@`[0]}`

if (chat.detect && m.messageStubType == 21) {
await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })   

} else if (chat.detect && m.messageStubType == 22) {
await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 23) {
await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })    

} else if (chat.detect && m.messageStubType == 25) {
await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.detect && m.messageStubType == 26) {
await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  

} else if (chat.detect && m.messageStubType == 29) {
await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

return;
} if (chat.detect && m.messageStubType == 30) {
await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  

} else {
//console.log({ messageStubType: m.messageStubType,
//messageStubParameters: m.messageStubParameters,
//type: WAMessageStubType[m.messageStubType], 
//})
}}
