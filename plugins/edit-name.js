let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
const newName = m.text.trim().split(' ').slice(1).join(' ');
if (!newName) {
return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y escriba un nuevo nombre para cambiar el nombre del bot *( ${wm} )*` }, { quoted: m });
}
global.wm = newName;
conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado el nombre del bot anterior a *( ${newName} )* con exito!_` }, { quoted: m });
};
handler.command = ['setname']; 
handler.owner = true;
export default handler;

