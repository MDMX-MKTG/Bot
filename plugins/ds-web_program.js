let handler = async (m, { conn, command }) => {
let dvs = `
- _Paginas web con programacion gratuita para aprender._


1. HTML • http://freecodecamp.org

2. CSS • http://css-tricks.com

3. JavaScript • http://javascript30.com

4. React • http://react-tutorial.app

5. Tailwind CSS • http://scrimba.com

6. Vue • http://vueschool.io

7. Python • http://pythontutorial.net

8. SQL • http://sqlbolt.com

9. Git and GitHub • http://GitFluence.com

10. Blockchain • http://Cryptozombies.io

11. Mongo DB • http://mongodb.com

12. Node JS • http://nodejsera.com`

await conn.sendMessage(m.chat, { text: dvs }, { quoted: m })
}

handler.command = ["ds_programs", "ds_lang"]
export default handler
