import fs from 'fs';
const handler = async (m, {conn, text}) => {
  conn.sendMessage(m.chat, { text: `Enviando base de datos.` }, { quoted: m });
  const db = await fs.readFileSync('./database.json');
  return await conn.sendMessage(m.chat, {document: db, mimetype: 'application/json', fileName: 'database.json'}, {quoted: m});
};
handler.command = /^(ddd)$/i;
handler.owner = true;
export default handler;
