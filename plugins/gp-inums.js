//import { areJidsSameUser } from '@adiwajshing/baileys'
let areJidsSameUser =  (await import('@whiskeysockets/baileys')).default
let handler = async (m, { conn, text, participants, args, areJidsSameUser, command }) => {
let member = participants.map(u => u.id)
if(!text) {
var sum = member.length
} else {
var sum = text} 
var total = 0
var sider = []
for(let i = 0; i < sum; i++) {
let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
if((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { 
if (typeof global.db.data.users[member[i]] !== 'undefined'){
if(global.db.data.users[member[i]].whitelist == false){
total++
sider.push(member[i])}
}else {
total++
sider.push(member[i])}}}
const delay = time => new Promise(res=>setTimeout(res,time));
switch (command) {
case "inum": 
if(total == 0) return conn.sendMessage(m.chat, { text: `✓ _El grupo no contiene personas inactivas por el momento, vuelva mas tarde._` }, { quoted: m })
let inums = `ᗢ *INACTIVOS ENCONTRADOS* ᗢ
- _Se han encontrado algunas personas inactivas en este grupo._
_Estos son los conteos asumidos._

۰───────۰

• *Participantes totales:* ${sum}

• *Inactivos segun suponido:*
${sider.map(v => '≻ @' + v.replace(/@.+/, '')).join('\n')}

۰───────۰

*Nota:* _Esto no puede ser 100% acertado, el bot inicia el conteo al entrar en el grupo, por lo que cualquier mienbro que ya ha hablado bastante tiempo, puede tomar el derecho de reclamar._
`.trim()
conn.sendMessage(m.chat, {text: `${inums}`, mentions: await conn.parseMention(inums)}, { quoted: m })
  break   
case "kicknum":  
if(total == 0) return conn.sendMessage(m.chat, { text: `✓ _El grupo no contiene personas inactivas por el momento, vuelva mas tarde._` }, { quoted: m })
let kicknum = `ᗢ *ELIMINACION DE INACTIVOS* ᗢ
- _Se eliminaran los inactivos en este grupo, ya no forman parte de esta comunidad._
• _Pueden reclamar oportunidad si quieren._

۰───────۰

• *LISTA DE ELIMINADOS:*
${sider.map(v => '≻ @' + v.replace(/@.+/, '')).join('\n')}

۰───────۰

- *_Se eliminaran los numeros mensionados uno por uno cada 10 o 20 minutos._*`.trim()
await conn.sendMessage(m.chat, { text: kicknum, mentions: await conn.parseMention(kicknum) }, { quoted: m })
await delay(1 * 10000)
let chat = global.db.data.chats[m.chat]
chat.welcome = false
try{
       
         let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
       let kickedGhost = sider.map(v => v.id).filter(v => v !== conn.user.jid)
       for (let user of users)
           if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin)
        {
        let res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        kickedGhost.concat(res)
       await delay(1 * 10000)
       }} finally{
        chat.welcome = true
       }
break            
}}
handler.command = /^(inum|kicknum)$/i
handler.group = handler.botAdmin = handler.admin = true
handler.fail = null
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
