import yts from 'yt-search';
import fetch from 'node-fetch';
let confirmation = {};

let handler = async (m, { conn, command, text, args, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `𔒝 _Escriba el nombre de la cancion que desea buscar._` }, { quoted: m }); //Texto.
let res = await yts(text);
let vid = res.videos[0];
if (!vid) return conn.sendMessage(m.chat, { text: `𔒝 _No se ha encontrado el resultado, recuerde escribir el nombre de la cancion._` }, { quoted: m }); //Texto.

let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let chat = global.db.data.chats[m.chat];

let playMessage = `
⫶☰ \`Y O U T U B E\`
> _Resultados encontrados en youtube._

⊃ *Titulo:* ${vid.title}
⊃ *Publicado en:* ${vid.ago}
⊃ *Duracion:* ${vid.timestamp}
⊃ *Vistas:* ${vid.views.toLocaleString()}
`;

await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: playMessage, footer: textoInfo,
buttons: [
{ buttonId: `${usedPrefix}ytmp3`, buttonText: { displayText: "⎋ AUDIO", }, type: 1, }, 
{ buttonId: `${usedPrefix}ytmp4`, buttonText: { displayText: "⎋ VIDEO", }, type: 1, },
], viewOnce: true, headerType: 4, }, 
{ quoted: m }) //Dos botones

}

handler.command = ['play','play2'];
export default handler;

/*
handler.before = async m => {
if (m.isBaileys) return; // Ignorar mensajes del bot
if (!(m.sender in confirmation)) return; // Solo continuar si hay confirmación pendiente

let { sender, timeout, url, chat } = confirmation[m.sender]; // Desestructuración que incluye la url y chat
if (m.text.trim() === '1') {
clearTimeout(timeout);
delete confirmation[m.sender];

let res = await fetch(global.API('fgmods', '/api/downloader/ytmp3', { url: url }, 'apikey'));
let data = await res.json();

let { title, dl_url, thumb, size, sizeB, duration } = data.result;
conn.sendFile(m.chat, dl_url, title + '.mp3', `≡  *FG YTDL*\n\n▢ *📌 ${mssg.title}* : ${title}`, m, false, { mimetype: 'audio/mpeg', asDocument: chat.useDocument });
m.react('✅');
} else if (m.text.trim() === '2') {
clearTimeout(timeout);
delete confirmation[m.sender];

let res = await fetch(global.API('fgmods', '/api/downloader/ytmp4', { url: url }, 'apikey'));
let data = await res.json();

let { title, dl_url, thumb, size, sizeB, duration } = data.result;
let isLimit = limit * 1024 < sizeB;

await conn.loadingMsg(m.chat, '📥 Descargando', ` ${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m);

if (!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp4', `≡  *FG YTDL*\n*📌${mssg.title}:* ${title}\n*⚖️${mssg.size}:* ${size}`, m, false, { asDocument: chat.useDocument });
m.react('✅');
}

}
*/

