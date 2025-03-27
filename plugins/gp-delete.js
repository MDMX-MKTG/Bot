let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!m.quoted && !m.mentionedJid?.length && !args[0]) return conn.sendMessage(m.chat, {text: `𔒝 _Ingrese el comando y mensione o responda a un usuario para eliminar su mensaje._`}, { quoted: m });
try {
if (m.quoted) {
let delet = m.quoted.sender;
let bang = m.quoted.id;
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
}

let target = '';
if (m.mentionedJid?.length) {
target = m.mentionedJid[0];
} else if (args[0] && args[0].startsWith('+')) {
target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
} else {
return conn.sendMessage(m.chat, {text: `𔒝 _Debe de mensionar o responder a alguien para eliminar su mensaje o proporcionar cuantos mensajes hay que eliminar._`}, { quoted: m });
}

let chats = await conn.chats[m.chat]?.messages || [];
let messagesToDelete = Object.values(chats).filter(
msg => (msg.key.participant === target || msg.key.remoteJid === target));

if (!messagesToDelete.length) return conn.sendMessage(m.chat, {text: `𔒝 _No se ha encontrado los mensajes del participante para eliminar._`}, { quoted: m });
let totalToDelete = Math.min(messagesToDelete.length, 200); 
let deletedCount = 0;

for (let i = 0; i < totalToDelete; i++) {
let message = messagesToDelete[i];
try {
await conn.sendMessage(m.chat, { delete: message.key });
deletedCount++;
await delay(100); 
} catch (err) {
conn.sendMessage(m.chat, {text: `⦗ ✘ ⦘ _Ocurrio un error al eliminar un mensaje del mismo participante._`}, { quoted: m });
}}
conn.sendMessage(m.chat, {text: `✓ _Se han eliminado ${deleteCount} mensajes del usuario mensionado._`}, { quoted: m });
} catch (err) {
conn.sendMessage(m.chat, {text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *#${command}*_`}, { quoted: m });
console.error(err);
}};
handler.command = /^del(ete)?$/i;
handler.group = true; 
handler.admin = true; 
handler.botAdmin = true; 

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
