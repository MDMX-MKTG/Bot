let handler = async (m, { conn, text, usedPrefix, command, args, participants, isOwner }) => {
let time = global.db.data.users[m.sender].lastjoin + 86400000
  let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  let delay = time => new Promise(res => setTimeout(res, time))
 
  let name = m.sender 
  let [_, code] = text.match(linkRegex) || []
  if (!args[0]) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese el comando mas un enlace grupal y los dias de rentabilidad._\n\n• *Por ejemplo:*\n#${command} https://chat.whatsapp.com/XXXXXXXXXXX 3` }, { quoted: m })
  if (!code) return conn.sendMessage(m.chat, { text: `𔒝 _El enlace que has ingresado no es valido, recuerde que tiene que ser un enlace grupal, vuelva a intentarlo._` }, { quoted: m })
  if (!args[1]) return conn.sendMessage(m.chat, { text: `𔒝 _El numero de dias es opcional, recuerde agregar el numero de dias para que el bot se salga al finalizar dicho dia._\n\n• *Por ejemplo:*\n#${command} https://chat.whatsapp.com/XXXXXXXXXXX 3` }, { quoted: m })
  if (isNaN(args[1])) return conn.sendMessage(m.chat, { text: `𔒝 _Solo se admite numeros especificos al colorar los dias, nada de letras ni simbolos, vuelva a intentarlo._` }, { quoted: m })
  let owbot = global.owner[1] 
  conn.sendMessage(m.chat, { text: `𔒝 _Espere unos segundos, estamos procesando la solicitud..._` }, { quoted: m })
  await delay(3000)
  conn.sendMessage(m.chat, { text: `✓ _¡El bot se ha unido al grupo con exito!_` }, { quoted: m })
  try {
  let res = await conn.groupAcceptInvite(code)
  let b = await conn.groupMetadata(res)
  let d = b.participants.map(v => v.id)
  let member = d.toString()
  let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'))
  let nDays = 86400000 * args[1]  
  let now = new Date() * 1
  if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += nDays
  else global.db.data.chats[res].expired = now + nDays
  if (e.length) await conn.sendMessage(m.chat, { text: `✓ El bot se ha unico con exito al grupo!!!\n\n*Tiempo de queda:*\n${msToDate(global.db.data.chats[res].expired - now)} dia(s)` }, { quoted: m })
 
 if (e.length) await conn.reply(res, `Hola, soy ${wm}, me ha invitado *${m.name}* para unirme a este grupo, espero llevarnos bien.`, m, {
    mentions: d
     }).then(async () => {
     await delay(7000)
     }).then( async () => {
     await conn.reply(res, `Holaaaa, volvi.`, 0)
     await conn.reply(global.owner[1]+'@s.whatsapp.net', `Hola, hay una invitacion solicitada.\n\n• Usuario: @${m.sender.split('@')[0]} me ha invitado al grupo\n\n• Grupo: *${await conn.getName(res)}*\n\n*Enlace:* ${args[0]}`, null, {mentions: [m.sender]})
     })
     if (!e.length) await conn.reply(global.owner[1]+'@s.whatsapp.net', `Hola, hay una invitacion solicitada.\n\n• Usuario: @${m.sender.split('@')[0]} me ha invitado al grupo\n\n• Grupo: *${await conn.getName(res)}*\n\n*Enlace:* ${args[0]}`, null, {mentions: [m.sender]})
     if (!e.length) await m.reply(`Se ha invitado al bot en el grupo.`).then(async () => {
     let mes = `¡Hola gente!
El usuario *${m.name}* me ha invitado en este grupo.
Soy un bot de WhatsApp, pueden llamarme *${wm}*, o unicamente *Bot*

Para ver los comandos, pueden usar el comando: *${usedPrefix}allmenu*

Saldre aproximadamente en: ${msToDate(global.db.data.chats[res].expired - now)} dia(s)
como invitado en este grupo, espero llevarme bien.`
  await conn.reply(res, mes, m, { mentions: d })
     })
    } catch (e) {
      conn.reply(global.owner[1]+'@s.whatsapp.net', e)
      conn.sendMessage(m.chat, {text: `⦗ ✘ ⦘ _Lo sentimos, pero el bot no se puede agregar en grupos._` }, { quoted: m })
      }
}
handler.command = ['temps', 'temporal'] 
handler.owner = true
export default handler
function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
