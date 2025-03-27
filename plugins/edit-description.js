let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
const newDesc = m.text.trim().split(' ').slice(1).join(' '); 
if (!newDesc) {
return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y escriba la nueva descripcion del bot para cambiarlo._\n- *Descripcion actual:* ${textoInfo}` }, { quoted: m });
}
global.textoInfo = newDesc;
conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado la descripcion del bot anterior a *( ${newDesc} )* con exito!_` }, { quoted: m });
};
handler.command = ['setfooter']; 
handler.owner = true;
export default handler;
