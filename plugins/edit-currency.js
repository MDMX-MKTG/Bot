let handler = async (m, { conn, isRowner }) => {
const newCurrency = m.text.trim().split(' ').slice(1).join(' '); 
if (!newCurrency) {
return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y escriba el nuevo nombre para la moneda: *#${currency}*_\n\n• *Por ejemplo:*\n${usedPrefix + command} JoseCoins` }, { quoted: m });
}
global.currency = newCurrency;
conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado el nombre del recurso anterior a *( ${newCurrency} )* con exito!_` }, { quoted: m });
};
handler.command = ['set_econ']; 
handler.owner = true;
export default handler;
