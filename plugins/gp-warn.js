const handler = async (m, {conn, text, command, usedPrefix}) => {
if (m.mentionedJid.includes(conn.user.jid)) return;
let who;
if (m.isGroup) { who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text } else who = m.chat;
const user = global.db.data.users[who];
const bot = global.db.data.settings[conn.user.jid] || {};
const dReason = 'No especificado';
const msgtext = text || dReason;
const sdms = msgtext.replace(/@\d+-?\d* /g, '');
if (!who) {
return conn.sendMessage(m.chat, { text: `𔒝 _Mensione a un usuario para darle una advertencia._` }, { quoted: m });
}
user.warn += 1;
let advertido = `_Hola ${user.warn == 1 ? `@${who.split`@`[0]}` : `@${who.split`@`[0]}`}, has recibido una advertencia por parte de los admins._\n\n- *RAZON:* ${sdms}\n\n- Tienes ${user.warn} advertencias, si superas a los 3, seras eliminado/a.`;
await conn.sendMessage(m.chat, { text: advertido, mentions: await conn.parseMention(advertido) }, { quoted: m });
if (user.warn >= 3) {
if (!bot.restrict) {
return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _Lo siento, no puedo realizar estas acciones debido a que las restricciones estan desactivadas._\n\n- _Puedes ver los activadores para activarlo con el comando:_ *#config*` }, { quoted: m });
}
user.warn = 0;
let eliminado = `𔒝 _El participante_ @${who.split`@`[0]} _sera eliminado de inmediato._\n- _Ya ha superado las 3 advertencias establecidas._`;
await conn.sendMessage(m.chat, {text: eliminado, mentions: await conn.parseMention(eliminado)}, { quoted: m });
await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
}
return !1
};
//handler.customPrefix = /^[+warn] /
handler.command = ["warn"]
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
