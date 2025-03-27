import { generateWAMessageFromContent } from "@whiskeysockets/baileys"
import { cpus as _cpus, totalmem, freemem } from 'os'
// import util from 'util'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
let format = sizeFormatter({
std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn, usedPrefix, command }) => {
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime) 
let totalreg = Object.keys(global.db.data.users).length
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
const used = process.memoryUsage()
const cpus = _cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})

let old = performance.now()
let neww = performance.now()
let speed = neww - old
let menucompleto = `
⫶☰ \`MENU PRINCIPAL\`
> _Bienvenido al menu completo._

🜲 *Bot:* ${wm}
⎋ *Baileys:* ${mxBails}
⎙ *Modulo:* ${mxModls}
⏍ *Fecha:* ${botdate}
ⴵ *Actividad:* ${uptime}
⤷ *Version:* ${vs}

${readMore}
╭─●    •   •   •    ⊑⊒    •   •   •    ●─۰
> ⏍ \`INFORMACION:\`
> *${usedPrefix}infobot*
> *${usedPrefix}stat*
> *${usedPrefix}grupos*
> *${usedPrefix}cuentas*
> *${usedPrefix}creador*
> *${usedPrefix}ping*
> •───────────────•
> ⏍ \`DESCARGAS\`
> *${usedPrefix}facebook* ⧾ _url_
> *${usedPrefix}instagram* ⧾ _url_
> *${usedPrefix}tiktok* ⧾ _url_
> *${usedPrefix}twitter* ⧾ _url_
> *${usedPrefix}pinterest* ⧾ _url_
> *${usedPrefix}mediafire* ⧾ _url_
> *${usedPrefix}imagen* ⧾ _text_
> *${usedPrefix}mp3* ⧾ _url_
> *${usedPrefix}mp4* ⧾ _url_
> *${usedPrefix}play* ⧾ _text_
> *${usedPrefix}apk* ⧾ _text_
> •───────────────•
> ⏍ \`GRUPOS\`
> *${usedPrefix}add* ⧾ _nro_
> *${usedPrefix}warn* ⧾ _mention_
> *${usedPrefix}delwarn* ⧾ _mention_
> *${usedPrefix}promote* ⧾ _mention_
> *${usedPrefix}demote* ⧾ _mention_
> *${usedPrefix}tags*
> *${usedPrefix}del* ⧾ _mention/query_
> *${usedPrefix}inum*
> *${usedPrefix}kicknum*
> *${usedPrefix}dnums* ⧾ _query_
> *${usedPrefix}kicknros* ⧾ _query_
> *${usedPrefix}group* ⧾ _query_
> •───────────────•
> ⏍ \`AJUSTES\`
> *${usedPrefix}chatgpt* ⧾ _text_
> *${usedPrefix}imagina* ⧾ _text_
> *${usedPrefix}gemini* ⧾ _text_
> *${usedPrefix}on/off* ⧾ _query_
> *${usedPrefix}hd* ⧾ _img_
> •───────────────•
> ⏍ \`CONVERTIDOR\`
> *${usedPrefix}timg* ⧾ _sticker_
> *${usedPrefix}togif* ⧾ _video_
> *${usedPrefix}tovideo* ⧾ _sticker_
> *${usedPrefix}turl* ⧾ _img_
> •───────────────•
> ⏍ \`STICKER\`
> *${usedPrefix}sticker* ⧾ _query_
> *${usedPrefix}footer* ⧾ _sticker_
> •───────────────•
> ⏍ \`DS\`
> *${usedPrefix}brat* ⧾ _text_
> *${usedPrefix}clima* ⧾ _query_
> *${usedPrefix}ds_lang*
> *${usedPrefix}logos*
> *${usedPrefix}report* ⧾ _text_
> •───────────────•
> ⏍ \`OWNER\`
> *${usedPrefix}+plugin* ⧾ _query_
> *${usedPrefix}ddd*
> *${usedPrefix}is* ⧾ _query_
> *${usedPrefix}fetch* ⧾ _query_
> *${usedPrefix}temporal* ⧾ _url/query_
> *${usedPrefix}update*
╰─●    •   •   •    ⊑⊒    •   •   •    ●─۰

`
conn.sendMessage(m.chat, { text: `${menucompleto}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: imagen, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) //Imagen personalizada con una imagen grande.

}
handler.command = ['menu', 'allmenu', 'menucompleto']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
