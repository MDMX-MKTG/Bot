let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `${pesan}`
let teks = `⫶☰ *\`M E N T I O N S\`*\n⌕ ${oi}\n\n`
for (let mem of participants) {
teks += `𔓕│›  @${mem.id.split('@')[0]}\n`}
teks += `${wm}`
await conn.sendMessage(m.chat, { image: { url: mxLogo }, caption: teks, mentions: participants.map(a => a.id) }, { quoted: m })
//conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })  
}
handler.command = /^(tagall|tags)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler
