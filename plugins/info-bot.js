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
  let infobt = `
⫶☰ \`I N F O  -  B O T\`
> _Informacion de ${wm}_  

- *DETALLE DE PROPIEDAD:*
🝔 *Version:* ${vs}
🝔 *Nombre:* ${wm}
🝔 *Propietario:* ${author}
🝔 *Baileys:* ${mxBails}
🝔 *Modulo:* ${mxModls}

- *DETALLE DE USO:*
🝔 *Registrados:* ${totalreg}
🝔 *Actividad:* ${uptime}
🝔 *Chats:* ${chats.length}

- *DETALLE DE CHATS:*
🝔 *Chats grupales:* ${groupsIn.length}
🝔 *Chats privados:* ${chats.length - groupsIn.length}
🝔 *Grupos unidos:* ${groupsIn.length}
🝔 *Grupos dejados:* ${groupsIn.length - groupsIn.length}
`
conn.sendMessage(m.chat, { text: `${infobt}`, contextInfo: { externalAdReply: { title: wm, body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m }) //Imagen personalizada con una imagen grande.

}
handler.command = ['info', 'infobot', 'botinfo']

export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
console.log({ms,h,m,s})
return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')}
