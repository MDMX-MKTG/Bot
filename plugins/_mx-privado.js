export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
  if (bot.antiPrivate && !isOwner && !isROwner) {
    await conn.sendMessage(m.chat, { text: `𔒝 _Hola usuario_ @${m.sender.split`@`[0]}\n- _No puedes utilizar el bot en chats privados, seras bloqueado por realizar esta accion.`, mentions: [m.sender] }, { quoted: m }) //Texto.
    await this.updateBlockStatus(m.chat, 'block');
  }
  return !1;
}
