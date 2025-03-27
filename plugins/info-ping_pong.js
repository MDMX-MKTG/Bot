import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'
let handler = async (m, { conn }) => {
let timestamp = speed();
let latensi = speed() - timestamp;
exec(`neofetch --stdout`, (error, stdout, stderr) => {
let child = stdout.toString("utf-8");
let ssd = child.replace(/Memory:/, "Ram:");
conn.sendMessage(m.chat, {text: `¡Pong! 🏓`}, { quoted: m });
conn.sendMessage(m.chat, {text: `- *Velocidad total:* ${latensi.toFixed(4)} milisegundos ✓` }, { quoted: m } )
//conn.reply(m.chat, `- *Velocidad total:* ${latensi.toFixed(4)} ms ✓`, m, );
});
}
handler.command = ['ping', 'p']
export default handler
