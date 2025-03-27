import fs from 'fs';
import path from 'path';
const basePath = './MdmxDirector/';
const handler = async (m, { conn, args, isOwner }) => {
if (!isOwner) return;
const newName = args.join(' ');
if (!newName) return conn.sendMessage(m.chat, { text: `- _Ingrese el comando y escriba el nombre para el PreBot._` }, { quoted: m });
const botNumber = conn.user.jid.replace(/[^0-9]/g, '');
const botPath = path.join(basePath, botNumber);
const nameFile = path.join(botPath, 'wm.txt');
if (!fs.existsSync(botPath)) {
fs.mkdirSync(botPath, { recursive: true });
}
fs.writeFileSync(nameFile, newName, 'utf-8');
conn.sendMessage(m.chat, { text: `✓ El nombre del PreBot fue cambiado a ${newName} con exito.` }, { quoted: m });
};

export const getBotName = (botNumber) => {
const botPath = path.join(basePath, botNumber);
const nameFile = path.join(botPath, 'wm.txt');
if (fs.existsSync(nameFile)) {
return fs.readFileSync(nameFile, 'utf-8').trim();
}
return global.wm;
};

handler.command = ['setprename'];
handler.premium = true;
export default handler;
