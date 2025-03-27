import fs from 'fs';
import path from 'path';
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
let handler = async (m, { conn, usedPrefix, command, isRowner }) => {
if (!m.quoted || !/image/.test(m.quoted.mimetype)) return conn.sendMessage(m.chat, { text: `𔒝 ≻ _Ingrese el comando y responda a una imagen para cambiar la foto del menu._` }, { quoted: m });
try {
const media = await m.quoted.download();
let link = await catbox(media);
if (!isImageValid(media)) {
return conn.sendMessage(m.chat, { text: `✘ ≻ _Formato no compatible, recuerda responder solo a imagenes, vuelva a intentarlo._` }, { quoted: m });
}

global.imagen = `${link}`;
await conn.sendMessage(m.chat, { text: `✓ _¡Se ha cambiado la imagen del menu con exito!_\n- _Puedes usar el comando *#menu* para ver._` }, { quoted: m });

} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `✘ ≻ _Ocurrio un error con el comando: *${usedPrefix + command}*` }, { quoted: m });
}
};

const isImageValid = (buffer) => {
const magicBytes = buffer.slice(0, 4).toString('hex');
if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2') {
return true;
}

if (magicBytes === '89504e47') {
return true;
}

if (magicBytes === '47494638') {
return true;
}

return false; 
};

handler.command = ['setmenu'];
export default handler;

function formatBytes(bytes) {
if (bytes === 0) {
return "0 B";
}
const sizes = ["B", "KB", "MB", "GB", "TB"];
const i = Math.floor(Math.log(bytes) / Math.log(1024));
return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function catbox(content) {
const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
const blob = new Blob([content.toArrayBuffer()], { type: mime });
const formData = new FormData();
const randomBytes = crypto.randomBytes(5).toString("hex");
formData.append("reqtype", "fileupload");
formData.append("fileToUpload", blob, randomBytes + "." + ext);

const response = await fetch("https://catbox.moe/user/api.php", {
method: "POST",
body: formData,
headers: {
"User-Agent":
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
},
});
return await response.text();
}

