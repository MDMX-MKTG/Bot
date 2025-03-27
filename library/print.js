import chalk from "chalk";
import { watchFile } from "fs";

const terminalImage = global.opts["img"] ? require("terminal-image") : "";
const urlRegex = (await import("url-regex-safe")).default({ strict: false });

const Nombrado = "MDMX - MKTG";
const titleTextoInfo = "INFORMACION";
const titleDataBases = "DEPENDENCIAS";
const remDecor = {
heart: chalk.whiteBright("⛁⛀"), 
star: chalk.whiteBright("✬"),
version: chalk.whiteBright("^8.3.0ls"),
mxBails: chalk.whiteBright("@mdmx-socks:github/MDMX-MKTG/socks"),
mxModls: chalk.whiteBright("@module-mdmx"),
wave: chalk.redBright("~"), 
title: chalk.green.bold(Nombrado),
titleM: chalk.cyan.bold(titleTextoInfo),
titleD: chalk.cyan.bold(titleDataBases),
line: chalk.blueBright("⋄──────────🝔"),
time: () => chalk.whiteBright(new Date().toLocaleTimeString()),
};

const log = (text, error = false) =>
  console.log(
`
╭●┬───────────────────⊹
│⫿│ⴵ Tiempo: ${remDecor.time()}
│⫿│⧁ Bot: ${remDecor.title}
│⫿│⚘ Version: ${remDecor.version}
│⫿│ ${remDecor.line}
│⫿│ ${remDecor.titleD}
│⫿│ ${remDecor.mxBails}
│⫿│ ${remDecor.mxModls}
│⫿│ ${remDecor.line}
│⫿│ ${remDecor.titleM}
│⫿│ ${chalk[error ? "red" : "blue"]("[Información]")}
│⫿│ ${chalk[error ? "redBright" : "greenBright"](text)}
╰●┴───────────────────⊹
`;
  );

export default async function (m, conn = { user: {} }) {
  let senderName = await conn.getName(m.sender);

  let chatName = "";
  if (m.chat && m.chat !== m.sender) {
if (!m.chat.endsWith("@g.us")) {
  chatName = "Privado";
} else {
  chatName = await conn.getName(m.chat);
  chatName = chatName ? `${chatName} ` : "";
}
  } else {
chatName = "Privado";
  }

  if (m.isCommand) {
let commandText = m.text.split(" ")[0];
const cmdtxt = chalk.cyanBright("Comando");
const cmd = chalk.yellowBright(`${commandText}`);
const from = chalk.greenBright("de");
const username = chalk.yellowBright(`${senderName}`);
const ins = chalk.greenBright("en");
const grp = chalk.blueBright(chatName);
log(
  `\n\n〘 LYRU 〙 ${remDecor.wave} ${cmdtxt} ${cmd} ${from} ${username} ${ins} ${grp} ${remDecor.wave}`,
);
  } else {
const msg = chalk.cyanBright("Mensaje");
const from = chalk.greenBright("de");
const username = chalk.yellowBright(`${senderName}`);
const ins = chalk.greenBright("en");
const grp = chalk.blueBright(chatName);
log(
  `\n\n〘 LYRU 〙 ${remDecor.wave} ${msg} ${from} ${username} ${ins} ${grp} ${remDecor.wave}`,
);
  }
}

let file = global.__filename(import.meta.url);
watchFile(file, () => {
  log(chalk.redBright("Update 'lib/print.js'"), false);
});