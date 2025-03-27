import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
let handler = async (m, { conn, command }) => {
  let mxPlugins = 'conv-turl'
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y responda a una imagen, video, audio o archivo para convertirlo en un enlace._` }, { quoted: m }); //Texto.
await conn.sendMessage(m.chat, { text: `_Procesando resultados, espere un momento..._` }, { quoted: m });  
  try {
    let media = await q.download();
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link = await catbox(media);
    let txt = `
⫶☰ \`C O N V  -  T U R L\`

⊃ *Enlace* ${link}
⊃ *Tamaño* ${formatBytes(media.length)}
⊃ *Expiración* ${isTele ? 'No expira.' : 'Posible.'}
`;

await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })
//await conn.sendFile(m.chat, media, 'thumbnail.jpg', txt, m, fkontak, rcanal);
    
  } catch {
  await conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m });
  }
};

handler.command = ['catbox', 'turl'];
export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
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
