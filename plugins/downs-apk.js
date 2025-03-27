import fs from 'fs';
import fetch from 'node-fetch';
let apkSession = new Map();
let handler = async (m, { conn, text, usedPrefix, command }) => {
let mxPlugins = 'downs-apk'
if (command === 'apk' && text) {
const reactionMessage = await conn.sendMessage(m.chat, { text: `_Buscando resultados de su solicitud, espere un momento..._` }, { quoted: m });
try {
const response = await fetch(`https://delirius-apiofc.vercel.app/download/apk?query=${encodeURIComponent(text)}`);
const data = await response.json();
if (!data.status || !data.data)
  throw new Error("No se encontró la aplicación.");
const app = data.data;
apkSession.set(m.chat, { app });
let description = `
⫶☰ \`D O W N L O A D  -  A P K\`

⸧ *Nombre:* ${app.name}
⸧ *Paquete:* ${app.id}
⸧ *Actualizado en:* ${app.publish}
⸧ *Tamaño total:* ${app.size}
⸧ *Descargas:* ${app.stats.downloads.toLocaleString()}
⸧ *Estrellas:* ${app.stats.rating.average}
`;

const buttons = [
{ buttonId: `${usedPrefix}apk_down`, buttonText: { displayText: "Descargar" }, type: 1 }
];
await conn.sendMessage(m.chat, { image: { url: app.image }, caption: description, buttons: buttons, viewOnce: true}, { quoted: m });
} catch (error) {
console.error("Error:", error);
conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m });
}
return;
  }


  if (command === 'apk_down') {
let session = apkSession.get(m.chat);
if (!session) {
return conn.sendMessage(m.chat, { text: `𔒝 _No has echo una busqueda, inicia una busqueda de apk usando el comando: *#apk*_` }, { quoted: m }); //Texto.
}
let { app } = session;
const downloadUrl = app.download;
await conn.sendMessage(m.chat, { text: `_Descargando el apk, espere un momento..._` }, { quoted: m });
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: "application/vnd.android.package-archive", fileName: `${app.name}.apk`, caption: `⫶☰ \`A P L I C A T I O N\`` }, { quoted: m });
return;
  }


  if (command === 'apk' && !text) {
return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y escriba el nombre de la aplicacion que desea buscar._\n\n» *Por ejemplo:*\n${usedPrefix + command} Terraria` }, { quoted: m }); //Texto.
}
};

handler.command = /^(apk|apk_down)$/i;
export default handler;

