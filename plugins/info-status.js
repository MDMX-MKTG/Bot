import ws from 'ws'

let handler = async (m, { conn, usedPrefix, isRowner }) => {
let totalreg = Object.keys(global.db.data.users).length
let totalchats = Object.keys(global.db.data.chats).length
let pp = mxLogo

let _muptime = process.uptime() * 1000 

if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(() => resolve(process.uptime() * 1000), 1000)
})
}

if (isNaN(_muptime)) {
_muptime = process.uptime() * 1000
}

let muptime = clockString(_muptime)

const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))

let old = performance.now()
let neww = performance.now()
let speed = (neww - old).toFixed(3)

let txt = `
⫶☰ \`E S T A D O  -  B O T\`
> _Estado actual del bot._

⊐ *Usuarios:* ${totalreg}
⊐ *Actividad:* ${uptime}
⊐ *Velocidad:* ${speed}
⊐ *Version:* ${vs}
`
await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}

handler.command = ['estado', 'status', 'stat']
export default handler

function clockString(ms) {
let d = Math.floor(ms / 86400000) 
let h = Math.floor(ms / 3600000) % 24 
let m = Math.floor(ms / 60000) % 60 

return [d, h, m].map(v => v.toString().padStart(2, '0')).join(':')
}
