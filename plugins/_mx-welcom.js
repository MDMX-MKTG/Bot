import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let chat = global.db.data.chats[m.chat];
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user ? user.name : await conn.getName(who);

  };

  let groupSize = participants.length;
  if (m.messageStubType === 27) {
    groupSize++;
  } else if (m.messageStubType === 28 || m.messageStubType === 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `
⫶☰ \`B I E N V E N I D O\`
> _Un nuevo participante se ha unido al grupo._

⎋ *Grupo:* ${groupMetadata.subject.trim()}
🜲 *Usuario:* @${m.messageStubParameters[0].split`@`[0]} 
ⴵ *Fecha:* ${botdate}
`;
await conn.sendMessage(m.chat, { text: `${bienvenida}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) //Imagen personalizada con una imagen grande.
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `
⫶☰ \`H A S T A  P R O N T O\`
> Un participante se ha despedido de este grupo.

⎋ *Grupo:* ${groupMetadata.subject.trim()}
🜲 *Usuario:* @${m.messageStubParameters[0].split`@`[0]}
ⴵ *Fecha:* ${botdate}`;
conn.sendMessage(m.chat, { text: `${bye}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) //Imagen personalizada con una imagen grande.
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `
⫶☰ \`H A S T A  P R O N T O\`
> Un participante fue eliminado recientemente.

⎋ *Grupo:* ${groupMetadata.subject.trim()}
🜲 *Usuario:* @${m.messageStubParameters[0].split`@`[0]}
ⴵ *Fecha:* ${botdate}`;
conn.sendMessage(m.chat, { text: `${kick}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) //Imagen personalizada con una imagen grande.
  }
}