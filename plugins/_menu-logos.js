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
let logos = `
⫶☰ \`L I S T A  -  L O G O S\`
> _¡Mira la lista de menus y crea tu primer logo!_

${readMore}
╭─●    •   •   •    ⊑⊒    •   •   •    ●─۰
> *_${usedPrefix}logo1_* _<text>_
> *_${usedPrefix}logo2_* _<text>_
> *_${usedPrefix}logo3_* _<text>_
> *_${usedPrefix}logo4_* _<text>_
> *_${usedPrefix}logo5_* _<text>_
> *_${usedPrefix}logo6_* _<text>_
> *_${usedPrefix}logo7_* _<text>_
> *_${usedPrefix}logo8_* _<text>_
> *_${usedPrefix}logo9_* _<text>_
> *_${usedPrefix}logo10_* _<text>_
> *_${usedPrefix}logo11_* _<text>_
> *_${usedPrefix}logo12_* _<text>_
> *_${usedPrefix}logo13_* _<text>_
> *_${usedPrefix}logo14_* _<text>_
> *_${usedPrefix}logo15_* _<text>_
> *_${usedPrefix}logo16_* _<text>_
> *_${usedPrefix}logo17_* _<text>_
> *_${usedPrefix}logo18_* _<text>_
> *_${usedPrefix}logo19_* _<text>_
> *_${usedPrefix}logo20_* _<text>_
> *_${usedPrefix}logo21_* _<text>_
> *_${usedPrefix}logo22_* _<text>_
> *_${usedPrefix}logo23_* _<text>_
> *_${usedPrefix}logo24_* _<text>_
> *_${usedPrefix}logo25_* _<text>_
> *_${usedPrefix}logo26_* _<text>_
> *_${usedPrefix}logo27_* _<text>_
> *_${usedPrefix}logo28_* _<text>_
> *_${usedPrefix}logo29_* _<text>_
> *_${usedPrefix}logo30_* _<text>_
> *_${usedPrefix}logo31_* _<text>_
> *_${usedPrefix}logo32_* _<text>_
> *_${usedPrefix}logo33_* _<text>_
> *_${usedPrefix}logo34_* _<text>_
> *_${usedPrefix}logo35_* _<text>_
> *_${usedPrefix}logo36_* _<text>_
> *_${usedPrefix}logo37_* _<text>_
╰─●    •   •   •    ⊑⊒    •   •   •    ●─۰

`
conn.sendMessage(m.chat, { text: `${logos}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: imagen, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) //Imagen personalizada con una imagen grande.

}
handler.command = ['logos', 'menulogo', 'logo']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
