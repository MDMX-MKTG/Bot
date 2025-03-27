let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
const newAuthor = m.text.trim().split(' ').slice(1).join(' ');
if (!newAuthor) {
return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y escriba el nuevo nombre del author para cambiarlo en este bot._\n\n• *Por ejemplo:*\n${usedPrefix + command} Jose` }, { quoted: m });
}
global.author = newAuthor;
conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado el nombre de autor anterior a *( ${newAuthor} )* con exito!_` }, { quoted: m });
};
handler.command = ['setcreator']; 
handler.owner = true;
export default handler;
