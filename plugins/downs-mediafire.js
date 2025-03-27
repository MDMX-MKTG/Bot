import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace valido de un archivo de *Mediafre* para descargarlo._` }, { quoted: m }); //Texto.
conn.sendMessage(m.chat, { text: `_Revisando el enlace..._` }, { quoted: m }) //Texto.;

try {
let api = await fetch(`https://api.agungny.my.id/api/mediafire?url=${encodeURIComponent(text)}`);
let json = await api.json();
if (json.status !== "true") return conn.sendMessage(m.chat, { text: `✘ _No se han encontrado los detalles del enlace, verifique si es correcto._` }, { quoted: m }); //Texto.

let { fileName, downloadLink, fileSize } = json.result;
let caption = `
⫶☰ *\`M E D I A F I R E\`*

❒ *Nombre:* ${fileName}
❒ *Tamaño:* ${fileSize || 'Desconocido'}
❒ *Enlace:* ${downloadLink}`;
await conn.sendMessage(m.chat, { text: `${caption}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }); //Imagen personalizada.
await conn.sendFile(m.chat, downloadLink, fileName, caption, m, null, { asDocument: true });

} catch (error) {
console.error(error);
conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Ocurrio un error con el comando: *${usedPrefix + command}*_\n- _Reporta el error al propietario del bot._\n\n*ERROR_COMMAND:* \`\`\`${error}\`\`\`` }, { quoted: m });
}
}

handler.command = ['mediafire', 'fires'];
export default handler;
