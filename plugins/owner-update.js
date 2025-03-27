import { execSync } from 'child_process';

const handler = async (m, { conn, text, command }) => {
try {
const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()
if (messager.includes('Already up to date.')) messager = `𔒝 _Este proyecto ya esta actualizado a una version mas reciente._`
if (messager.includes('Updating')) messager = `*⫶☰ U P D A T E*\n\n` + stdout.toString()
conn.sendMessage(m.chat, { text: messager }, { quoted: m });
} catch {      
try {    
const status = execSync('git status --porcelain');
if (status.length > 0) {
const conflictedFiles = status
.toString()
.split('\n')
.filter(line => line.trim() !== '')
.map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('MdmxSesion/') || line.includes('npm-debug.log')) {
return null;
}
return '*• ' + line.slice(3) + '*'})
.filter(Boolean);
if (conflictedFiles.length > 0) {
const errorMessage = `*ACTUALIZACION NO VERIFICADA*\n- _Favor de actualizar este proyecto de manera manual, ya que hay archivos nuevos o carpetas nuevas, no podemos procesar las descargas de todas ellas, por ende requiere una actualizacion manual._`
await conn.sendMessage(m.chat, { text: errorMessage }, { quoted: m }); 
}}
} catch (error) {
console.error(error);
if (error.message) {
const errorMessage2 = `ERROR_UPDATE: ` + error.message;
}
await conn.sendMessage(m.chat, { text: `_Ocurrio un error con el comando: *#${command}*_` }, { quoted: m });
}}};
handler.command = /^(update|acz)$/i;
handler.owner = true;
export default handler;
