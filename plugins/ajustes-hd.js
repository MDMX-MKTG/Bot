import FormData from "form-data";
import Jimp from "jimp";
const handler = async (m, {conn, usedPrefix, command}) => {
let mxPlugins = 'ajustes-hd';
try {    
 let q = m.quoted ? m.quoted : m;
 let mime = (q.msg || q).mimetype || q.mediaType || "";
 if (!mime) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando y responda a una imagen para aumentarle la calidad._` }, { quoted: m }); //Texto.
 if (!/image\/(jpe?g|png)/.test(mime)) return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _El formato mensionado no es compatible, debe responder unicamente imagenes._` }, { quoted: m }); //Texto.
conn.sendMessage(m.chat, { text: `_Procesando, espere un momento..._` }, { quoted: m });
 let img = await q.download?.();
 let pr = await remini(img, "enhance");
  conn.sendMessage(m.chat, {image: {url: pr}, caption: 'Aqui tiene su imagen.'}, {quoted: m});
 } catch {
  return conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m });
 }
};

handler.command = ["remini", "hd", "enhance"];
export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (availableOperations.includes(operation)) {
      operation = operation;
    } else {
      operation = availableOperations[0];
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"});
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"});
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    );
  });
}
