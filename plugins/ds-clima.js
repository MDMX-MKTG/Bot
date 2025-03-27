import fetch from 'node-fetch';
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let mxPlugins = 'ds-clima'
  if (!text) {
    return conn.sendMessage(m.chat, { text: `𔒝 _Escriba el nombre de la provincia para ver el clima._\n\n» *Por ejemplo:*\n${usedPrefix + command} Buenos Aires` }, { quoted: m }); //Texto.
  }

await conn.sendMessage(m.chat, { text: `_Buscado resultados del clima en la ubicacion: *${text}*, espere un momento..._` }, { quoted: m });

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(text)}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return conn.sendMessage(m.chat, { text: `⦗ ✘ ⦘ _La ubicacion no fue encontrada o esta mal escrito, recuerde usar una ubicacion provincial._\n\n» *Por ejemplo:*\n${usedPrefix + command} Buenos Aires` }, { quoted: m });
    }

    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message || 'Ocurrió un error');
    }

    const location = data.name;
    const country = data.sys.country;
    const weatherDescription = data.weather[0].description;
    const currentTemperature = `${data.main.temp}°C`;
    const minTemperature = `${data.main.temp_min}°C`;
    const maxTemperature = `${data.main.temp_max}°C`;
    const humidity = `${data.main.humidity}%`;
    const windSpeed = `${data.wind.speed} km/h`;

    const weatherMessage = `
⫶☰ \`E S T A D O  •  C L I M A\`
> _Estadisticas del clima en ${location}_

🌎 *Pais:* ${country}
🌐 *Provincia:* ${location}
📝 *Descripcion:* ${weatherDescription}
📆 *Fecha:* ${botdate}
🌡️ *Temperatura actual:* ${currentTemperature}
🚀 *Máxima:* ${maxTemperature}
🛰️ *Mínima:* ${minTemperature}
💧• *Humedad:* ${humidity}
🌬️ *Velocidad del viento:* ${windSpeed}
    `;
await conn.sendMessage(m.chat, { text: weatherMessage }, { quoted: m });
  } catch (error) {
    console.error(error);
await conn.sendMessage(m.chat, { text: `*〘 TypeError_Plugin 〙* Invalid command found in directory \`(MDMX-MKTG/home/plugins/${mxPlugins}.js)\`. Please submit a report using the *(#report)* or *(#suggest)* command so we can address the issue.` }, { quoted: m });
  }
};

handler.command = ['clima', 'weather'];
export default handler;
