let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
const newCurrency3 = m.text.trim().split(' ').slice(1).join(' '); 
if (!newCurrency3) {
return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y escriba el nuevo nombre de la tercera moneda *${currency}* para cambiarlo._\n\n• *Por ejemplo:*\n${usedPrefix + command} Velas` }, { quoted: m });
}
global.currency3 = newCurrency3;
conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado el nombre del recurso anterior a *( ${newCurrency3} )* con exito!_` }, { quoted: m });
};
handler.command = ['set_econ3']; 
handler.owner = true;
export default handler;
