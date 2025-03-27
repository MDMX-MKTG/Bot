import fs from 'fs';
import path from 'path';
const basePath = './MdmxDirector/';
const validPrefixRegex = /^[\p{Emoji}+\*./>]+$/u;
const handler = async (m, { conn, args, isOwner }) => {
  if (!isOwner) return;
 const newPrefix = args[0];
if (!newPrefix || !validPrefixRegex.test(newPrefix)) {
 return conn.sendMessage(m.chat, { text: `● _El prefijo ingresado es invalido, ingrese el comando y escriba el nuevo prefijo._\n\n• *Por ejemplo:*\n#setpx $\n#setpx 😄` }, { quoted: m });
 }
const botNumber = conn.user.jid.replace(/[^0-9]/g, '');
const botPath = path.join(basePath, botNumber);
const prefixFile = path.join(botPath, 'prefix.txt');
 if (!fs.existsSync(botPath)) {
  fs.mkdirSync(botPath, { recursive: true });
 }
 fs.writeFileSync(prefixFile, newPrefix, 'utf-8');
conn.sendMessage(m.chat, { text: `✓ _Se ha cambiado el prefijo anterior por: ${newPrefix}_` }, { quoted: m });
};
export const getPrefix = (botNumber) => {
 const botPath = path.join(basePath, botNumber);
  const prefixFile = path.join(botPath, 'prefix.txt');
 if (fs.existsSync(prefixFile)) {
return fs.readFileSync(prefixFile, 'utf-8').trim();
}
 return '.';
};

handler.command = ['setpx'];
handler.admin = true;
handler.botAdmin = true;
export default handler;
