let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
const newCurrency2 = m.text.trim().split(' ').slice(1).join(' '); 
if (!newCurrency2) {
return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y escriba el nuevo nombre de la segunda moneda: *${currency2}*_\n\n• *Por ejemplo:*\n${usedPrefix + command} Tokens` }, { quoted: m });
}
global.currency2 = newCurrency2;
conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado el nombre del recurso anterior a *( ${newCurrency2} )* con exito!_` }, { quoted: m });
};
handler.command = ['set_econ2']; 
handler.owner = true;
export default handler;
