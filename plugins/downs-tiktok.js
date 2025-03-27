import axios from "axios";
import FormData from "form-data";
import cheerio from "cheerio";
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
let mxPlugins = 'downs-tiktok';
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace de un video de *TikTok* para descargarlo._` }, { quoted: m }); //Texto.
await conn.sendMessage(m.chat, { text: `_Descargando el video, espere un momento..._` }, { quoted: m });
try {
let data = await tiktokdl(text);
console.log(data)
  let start = Date.now();
  let sp = (Date.now() - start) + 'ms';
  let cap = `⫶☰ \`T I K  T O K\`\n\n⊃ *Bot:* ${wm}\n⊃ *Fecha:* ${botdate}\n⊃ *Version:* ${vs}`;
  //let capp = `⫶☰ \`T I K  T O K\`\n\n⊃ *Bot:* ${wm}\n⊃ *Fecha:* ${botdate}\n⊃ *Version:* ${vs}`
  await conn.sendMessage(m.chat, { video: { url: data.server1.url }, caption: cap }, { quoted: m });
 //await conn.sendMessage(m.chat, { video: { url: data.serverHD.url }, caption: capp }, { quoted: m })
  } catch {
  await conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m });
  }
}
handler.command = /^(tiktok|tt)$/i;
export default handler

async function tiktokdl(url) {
let result = {};
let form = new FormData();
form.append("q", url);
form.append("lang", "id");

try {
let { data } = await axios("https://savetik.co/api/ajaxSearch", {
method: "post",
data: form,
headers: {
"content-type": "application/x-www-form-urlencoded",
"User-Agent": "PostmanRuntime/7.32.2"
}
});

let $ = cheerio.load(data.data);

result.status = true;
result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text();
result.server1 = {
quality: "MEDIUM",
url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
};
result.serverHD = {
quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
};
result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href");

} catch (error) {
result.status = false;
result.message = error;
console.log(result);
}

return result;
}
