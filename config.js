import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

// Funciones basicos.
global.official = [['5493873655135', 'MDMX', 1], ['5493873655168', 'MDMX - BUSINESS', 1]] 
global.owner = [['5493873655135', 'MDMX', true], ['5493873655168'], ['584245610338']]
global.mods = [] 
global.prems = []
global.mods = [] 


//Nombre o marca de agua.
global.wm = 'Bot'
global.mxBails = 'github:ds6/bails'
global.mxModls = '@mdmx-module'
global.textoInfo = 'Project developed for Jose courtesy of contributor @mdmx_mktg'
global.packname = 'WaBot'
global.author = 'Jose'
global.vs = '^1.0.5.ls'

//Enlaces
global.grupo = 'https://'
global.canal = 'https://'

//Icono cuadrado.
global.img = 'https://qu.ax/teoiY.jpg'

//Icono logo.
global.mxLogo = 'https://qu.ax/tzoWe.jpg'

//Icono ancho
global.imagen = 'https://qu.ax/unHYM.jpg'

//Ignora estos codigos.
global.botNumberCode = ""
global.confirmCode = ""
global.multiplier = 60 
global.isBaileysFail = true
global.baileys = '@whiskeysockets/baileys'


//No toques este código.
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright(`Config.js se ha actualizado`.trim()))
import(`${file}?update=${Date.now()}`)
})
