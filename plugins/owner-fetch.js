import fetch from 'node-fetch';
import {format} from 'util';
const handler = async (m, {text}) => {
  if (!/^https?:\/\//.test(text)) return conn.sendMessage(m.chat, { text: `𔒝 _Ingrese cualquier enlace para usar este comando._` }, { quoted: m });
  const _url = new URL(text);
  const url = global.API(_url.origin, _url.pathname, Object.fromEntries(_url.searchParams.entries()), 'APIKEY');
  const res = await fetch(url);
  if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
    throw `Content-Length: ${res.headers.get('content-length')}`;
  }
  if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(m.chat, url, 'file', text, m);
  let txt = await res.buffer();
  try {
    txt = format(JSON.parse(txt + ''));
  } catch (e) {
    txt = txt + '';
  } finally {
  conn.sendMessage(m.chat, { text: 'Aqui tiene el resultado.' }, { quoted: m });
    conn.sendMessage(m.chat, { text: txt.slice(0, 65536) + '' }, { quoted: m });
  }
};
handler.command = /^(fetch|get)$/i;
handler.owner = true;
export default handler;
