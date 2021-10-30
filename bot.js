const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const pkg = require('./package.json');
const axios = require('axios');
const Heroku = require('heroku-client');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./alexa/');
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');

const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});

let baseURI = '/apps/' + config.HEROKU.APP_NAME;


const WhatsAlexaDB = config.DATABASE.define('WhatsAlexa', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

var OWN = { ff: '0' }
const plugindb = require('./plugins/sql/plugin');

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function Alexa () {
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAlexaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    const conn = new WAConnection();
    const Session = new StringSession();
    conn.version = [2, 2140, 12]
    conn.setMaxListeners(0);

    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('open', async () => {
        console.log(
            chalk.blueBright.italic('🔁 CHECKING FOR COMMANDS...')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAlexaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('WhatAlexa')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('Made By TOXIC-DEVIL')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('🛑 NO COMMANDS FOUND!')
        );

        console.log(
            chalk.blueBright.italic('⬇️ INSTALLING COMMANDS...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
          try {
              if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                  console.log(plugin.dataValues.name);
                  var response = await got(plugin.dataValues.url);
                  if (response.statusCode == 200) {
                      fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                      require('./plugins/' + plugin.dataValues.name + '.js');
                  }     
              }
          } catch {
              console.log('❌ PLUGIN (' + plugin.dataValues.name + ') HAS BEEN CORRUPTED!')
          }
        });

        console.log(
            chalk.blueBright.italic('✅ COMMANDS INSTALLED SUCCESSFULLY!')
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            chalk.green.bold('🎉 BOT IS NOW ACTIVE IN YOUR ACCOUNT!')
        );
        
         if (config.LANG == 'EN') {
             await conn.sendMessage(conn.user.jid, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: `『 WhatsAlexa 』\n\nHello ${conn.user.name}!\n\n*🆘 General Help For You! 🆘*\n\n🔹 *#alive:* Check if the bot is running.\n\n🔹 *#list:* Shows the complete list of commands.\n\n🔹 *#restart:* It Restarts the bot.\n\n🔹 *#shutdown:* It Shutdown/Turn off the bot.\n\n *⚠ Warning, If you shutdown/turn off, there is no command to turn on the bot So You must got to heroku & turn on the worker. ⚠*.\n\nThank You For Using WhatsAlexa 💖`});
             
         } else if (config.LANG == 'ID') {
             await conn.sendMessage(conn.user.jid, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: `『 WhatsAlexa 』\n\nHalo ${conn.user.name}!\n\n*🆘 Bantuan umum 🆘*\n\n🔹 *#alive:* Periksa apakah bot sedang berjalan.\n\n🔹 *#list:* Menampilkan daftar lengkap perintah.\n\n🔹 *#restart:* Ini me-restart bot.\n\n🔹 *#shutdown:* Ini Matikan/Matikan bot.\n\n *⚠ Peringatan, Jika Anda mematikan/mematikan, tidak ada perintah untuk menghidupkan bot Jadi Anda harus pergi ke heroku & Nyalakan worker. ⚠*.\n\nTerima Kasih Telah Menggunakan WhatsAlexa 💖`});
             
         } else {
             await conn.sendMessage(conn.user.jid, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: `『 WhatsAlexa 』\n\nനമസ്കാരം ${conn.user.name}!\n\n*🆘 പൊതുവായ സഹായം 🆘*\n\n🔹 *#alive:* ബോട്ട് പ്രവർത്തിക്കുന്നുണ്ടോയെന്ന് പരിശോധിക്കുന്നു.\n\n🔹 *#list:* കമാൻഡുകളുടെ പൂർണ്ണ ലിസ്റ്റ് കാണിക്കുന്നു.\n\n🔹 *#restart:* ഇത് ബോട്ടിനെ പുനരാരംഭിപ്പിക്കുന്നു.\n\n🔹 *#shutdown:* ഇത് ഷട്ട്ഡൗൺ/ബോട്ട് ഓഫ് ചെയ്യുന്നു.\n\n *⚠ മുന്നറിയിപ്പ്, നിങ്ങൾ ഷട്ട്ഡൗൺ/ഓഫ് ചെയ്യുകയാണെങ്കിൽ, ബോട്ട് ഓണാക്കാൻ ഒരു കമാൻഡും ഇല്ല അതിനാൽ നിങ്ങൾ Heroku ഇല്പോയി worker ഓൺ ചെയ്യണം ⚠*.\n\nWhatsAlexa ഉപയോഗിച്ചതിന് നന്ദി 💖`});
        }
    });
    
    setInterval(async () => { 
        var getGMTh = new Date().getHours()
        var getGMTm = new Date().getMinutes()
         
        while (getGMTh == 19 && getGMTm == 1) {
            var announce = ''
            if (config.LANG == 'EN') announce = 'How are you guys 😝'
            if (config.LANG == 'ML') announce = 'എങ്ങനെയുണ്ട് കൂട്ടരേ 😝'
            if (config.LANG == 'ID') announce = 'Apa kabar kalian 😝'
            
            let video = 'https://betterstudio.com/wp-content/uploads/2019/12/GIF-in-WordPress.gif'
            let image = ''
            
            if (video.includes('http') || video.includes('https')) {
                var VID = video.split('youtu.be')[1].split(' ')[0].replace('/', '')
                var yt = ytdl(VID, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
                yt.pipe(fs.createWriteStream('./' + VID + '.mp4'));
                yt.on('end', async () => {
                    return await conn.sendMessage(conn.user.jid,fs.readFileSync('./' + VID + '.mp4'), MessageType.video, {caption: announce, mimetype: Mimetype.gif});
                });
            } else {
                if (image.includes('http') || image.includes('https')) {
                    var imagegen = await axios.get(image, { responseType: 'arraybuffer'})
                    return await conn.sendMessage(conn.user.jid, Buffer.from(imagegen.data), MessageType.image, { mimetype: Mimetype.png, caption: announce })
                } else {
                    return await conn.sendMessage(conn.user.jid, announce, MessageType.text)
                }
            }
        }
    }, 50000);
    
    setInterval(async () => { 
        if (config.AUTOBIO == 'true') {
            if (conn.user.jid.startsWith('90')) { 
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Europe/Istanbul' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('994')) { 
                var ov_time = new Date().toLocaleString('AZ', { timeZone: 'Asia/Baku' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('94')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Asia/Colombo' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('351')) { 
                var ov_time = new Date().toLocaleString('PT', { timeZone: 'Europe/Lisbon' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('75')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('RU', { timeZone: 'Europe/Kaliningrad' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('91')) { 
                var ov_time = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('62')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('ID', { timeZone: 'Asia/Jakarta' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('49')) { 
                var ov_time = new Date().toLocaleString('DE', { timeZone: 'Europe/Berlin' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('61')) {  
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('AU', { timeZone: 'Australia/Lord_Howe' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('55')) { 
                var ov_time = new Date().toLocaleString('BR', { timeZone: 'America/Noronha' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('33')) {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('FR', { timeZone: 'Europe/Paris' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('34')) { 
                var ov_time = new Date().toLocaleString('ES', { timeZone: 'Europe/Madrid' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('44')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('GB', { timeZone: 'Europe/London' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('39')) {  
                var ov_time = new Date().toLocaleString('IT', { timeZone: 'Europe/Rome' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('7')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('KZ', { timeZone: 'Asia/Almaty' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('998')) {  
                var ov_time = new Date().toLocaleString('UZ', { timeZone: 'Asia/Samarkand' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else if (conn.user.jid.startsWith('993')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('TM', { timeZone: 'Asia/Ashgabat' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
            else {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('EN', { timeZone: 'America/New_York' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time +'\n\n⏱ Auto Bio By WhatsAlexa'
                await conn.setStatus(biography)
            }
        }
    }, 7890);
    
    conn.on('message-new', async msg => {
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        var _0x4f3ecf=_0x3242;function _0x3242(_0x26c161,_0x29edcd){var _0x550a72=_0x550a();return _0x3242=function(_0x324247,_0x5a3888){_0x324247=_0x324247-0x1cc;var _0x15b1f3=_0x550a72[_0x324247];return _0x15b1f3;},_0x3242(_0x26c161,_0x29edcd);}function _0x550a(){var _0x4fbd53=['updatePresence','online','239099wdZUeu','BOT_PRESENCE','1533838mRittB','recording','1319241vRYoVk','1662792ZHghWd','composing','typing','4592330wcDecM','offline','5765992RSBUTR','available','key','remoteJid','4WzEbaA','unavailable','7713174XduhxB'];_0x550a=function(){return _0x4fbd53;};return _0x550a();}(function(_0x368706,_0x575751){var _0xcb37bd=_0x3242,_0x443a4f=_0x368706();while(!![]){try{var _0x44a554=-parseInt(_0xcb37bd(0x1d8))/0x1+parseInt(_0xcb37bd(0x1da))/0x2+-parseInt(_0xcb37bd(0x1dc))/0x3+-parseInt(_0xcb37bd(0x1d3))/0x4*(-parseInt(_0xcb37bd(0x1cd))/0x5)+parseInt(_0xcb37bd(0x1dd))/0x6+-parseInt(_0xcb37bd(0x1d5))/0x7+parseInt(_0xcb37bd(0x1cf))/0x8;if(_0x44a554===_0x575751)break;else _0x443a4f['push'](_0x443a4f['shift']());}catch(_0x340b33){_0x443a4f['push'](_0x443a4f['shift']());}}}(_0x550a,0xdc58a));if(config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1ce))await conn[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1d4)]);else{if(config['BOT_PRESENCE']==_0x4f3ecf(0x1d7))await conn[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1d0)]);else{if(config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1cc))await conn[_0x4f3ecf(0x1d6)](msg[_0x4f3ecf(0x1d1)][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1de)]);else config[_0x4f3ecf(0x1d9)]==_0x4f3ecf(0x1db)&&await conn[_0x4f3ecf(0x1d6)](msg['key'][_0x4f3ecf(0x1d2)],Presence[_0x4f3ecf(0x1db)]);}}
        
        if (msg.messageStubType === 32 || msg.messageStubType === 28) {

            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp 
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                 var json = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, { mimetype: Mimetype.png, caption:  gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) }); });                           
            } else if (gb.message.includes('{alexagif}')) {
                var json = await conn.groupMetadata(msg.key.remoteJid)
                await conn.sendMessage(msg.key.remoteJid, fs.readFileSync("./src/video-&-gif/WhatsAlexa.mp4"), MessageType.video, { mimetype: Mimetype.gif, caption: gb.message.replace('{alexagif}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) });
            } else if (gb.message.includes('{alexalogo}')) {
                var json = await conn.groupMetadata(msg.key.remoteJid)
                await conn.sendMessage(msg.key.remoteJid, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: gb.message.replace('{alexalogo}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) });
            } else {
                let pp 
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                 var json = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, { mimetype: Mimetype.png, caption:  gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) }); });    
            }
          }  
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {

             var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                if (gb.message.includes('{pp}')) {
                let pp
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                    var json = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, { mimetype: Mimetype.png, caption:  gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) }); });                           
            } else if (gb.message.includes('{alexagif}')) {
                var json = await conn.groupMetadata(msg.key.remoteJid)
                await conn.sendMessage(msg.key.remoteJid, fs.readFileSync("./src/video-&-gif/WhatsAlexa.mp4"), MessageType.video, { mimetype: Mimetype.gif, caption: gb.message.replace('{alexagif}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) });
            } else if (gb.message.includes('{alexalogo}')) {
                var json = await conn.groupMetadata(msg.key.remoteJid)
                await conn.sendMessage(msg.key.remoteJid, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: gb.message.replace('{alexalogo}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) });
            } else {
                let pp 
                try { pp = await conn.getProfilePicture(msg.messageStubParameters[0]); } catch { pp = await conn.getProfilePicture(); }
                 var json = await conn.groupMetadata(msg.key.remoteJid)
                await axios.get(pp, {responseType: 'arraybuffer'}).then(async (res) => {
                await conn.sendMessage(msg.key.remoteJid, res.data, MessageType.image, { mimetype: Mimetype.png, caption:  gb.message.replace('{pp}', '').replace('{gcname}', json.subject).replace('{gcowner}', json.owner).replace('{gcdesc}', json.desc).replace('{owner}', conn.user.name) }); });    
            }
          }         
            return;                               
    }
        if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }

        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((OWN.ff == "919400846679,0" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWN.ff || OWN.ff.includes(',') ? OWN.ff.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWN.ff)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
    
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
         
                        function _0x10ee(){const _0x2be3ac=['apply','ZkYQp','STAEc','chat','return\x20(fu','jHzte','prototype','exception','2490704ubBIQj','3LRibpI','conn.user.','986244szavZa','jrocD','warn','length','LOG','error','dvPHe','2871302UbLiiv','info','74tOJyif','CEZkf','jid','table','dFECH','ZPJZU','__proto__','1517550OPNKEz','FBumk','wTNEM','console','VHrKM','81PRQfYx','QncTd','edEac','lpfPJ','ctor(\x22retu','moteJid','search','bind','trace','12036794IOXvLB','YdTLg','SYaaC','tDAPO','(((.+)+)+)','wFLGs','10kEqbKr','acLTD','jUyiV','msg.key.re','toString','rn\x20this\x22)(','1065448ZDCJZl','constructo','umoEV','eRiPn','rvHfD','JvyRO','12286bASTGk','vPCri','IyXsA'];_0x10ee=function(){return _0x2be3ac;};return _0x10ee();}(function(_0xeb09b9,_0x377c61){function _0x4fd69f(_0x1a32d2,_0x1b10c5,_0x2b2850,_0x50e1f2){return _0x5897(_0x1b10c5-0x162,_0x50e1f2);}const _0x54ff0d=_0xeb09b9();function _0x2e29cf(_0x457707,_0x1bbbeb,_0x3f9907,_0x46275e){return _0x5897(_0x457707-0x218,_0x46275e);}while(!![]){try{const _0x1f039d=parseInt(_0x4fd69f(0x1e8,0x1f2,0x1d8,0x1fa))/(0x81*-0x31+0x6e9+0x11c9)*(parseInt(_0x4fd69f(0x1ec,0x209,0x213,0x20a))/(-0x15e5+0xf27+-0x120*-0x6))+-parseInt(_0x4fd69f(0x21c,0x1fe,0x210,0x1e3))/(-0x1*-0x23d4+-0xd0+-0x2301)*(-parseInt(_0x4fd69f(0x1fa,0x1fd,0x20e,0x1fb))/(0x1*0x1bff+0x943+0xc6a*-0x3))+-parseInt(_0x4fd69f(0x225,0x224,0x23d,0x230))/(-0x15*-0x39+0x1cf1+-0x2199)*(-parseInt(_0x2e29cf(0x2b6,0x29c,0x2a9,0x2a4))/(0x14*0x1c+-0x21b*-0x7+0x10e7*-0x1))+-parseInt(_0x2e29cf(0x2bd,0x2a8,0x2b4,0x2dc))/(0x1f3*-0xb+0x4a0+0x58*0x31)+parseInt(_0x2e29cf(0x2e0,0x2f3,0x2e3,0x2e9))/(-0x6ee*-0x1+-0x2671*0x1+-0x143*-0x19)*(-parseInt(_0x2e29cf(0x2cb,0x2e4,0x2c2,0x2df))/(-0x17b*-0x5+0xd16+-0x1474))+-parseInt(_0x2e29cf(0x2c6,0x2ae,0x2ad,0x2d2))/(-0xd26+-0x37*0x23+0x14b5*0x1)+parseInt(_0x2e29cf(0x2d4,0x2c1,0x2bd,0x2d1))/(-0x56*-0x43+-0x89c+-0x1*0xddb);if(_0x1f039d===_0x377c61)break;else _0x54ff0d['push'](_0x54ff0d['shift']());}catch(_0x28a1f2){_0x54ff0d['push'](_0x54ff0d['shift']());}}}(_0x10ee,0x1289a4+-0xe34da+0x6f4a0));function _0x54a26f(_0x50b61b,_0x4e5351,_0x3271dd,_0x128cb1){return _0x5897(_0x4e5351- -0x2e2,_0x3271dd);}const _0x27da0a=(function(){const _0x3ebfa2={};_0x3ebfa2[_0x51c93(-0x39,-0x4d,-0x2e,-0x4d)]=function(_0x45105a,_0x398ddb){return _0x45105a===_0x398ddb;},_0x3ebfa2[_0x51c93(-0x19,-0x20,-0x14,-0x34)]=_0x51c93(-0x3c,-0x58,-0x2f,-0x26);const _0x5adca0=_0x3ebfa2;function _0xc1ee3a(_0x352d1d,_0x5a245a,_0x50c859,_0x4c8234){return _0x5897(_0x352d1d- -0x1c7,_0x4c8234);}let _0x502473=!![];function _0x51c93(_0x3e6d19,_0xd206ab,_0x4d4dde,_0x3cbd96){return _0x5897(_0x3e6d19- -0xcb,_0x4d4dde);}return function(_0x36df2f,_0x59e4a8){function _0xd7494c(_0x654b47,_0x4d5fa1,_0x54dd54,_0x19272a){return _0x51c93(_0x654b47-0x1a1,_0x4d5fa1-0xac,_0x19272a,_0x19272a-0x19a);}if(_0x5adca0['IyXsA'](_0x5adca0[_0xd7494c(0x188,0x196,0x17f,0x181)],_0x5adca0['VHrKM'])){const _0x7dce36=_0x502473?function(){function _0xbf82f2(_0x138763,_0x504b52,_0x4d3043,_0x59fbf2){return _0xd7494c(_0x59fbf2- -0x2cb,_0x504b52-0x100,_0x4d3043-0x19,_0x138763);}if(_0x59e4a8){const _0x22d0ac=_0x59e4a8[_0xbf82f2(-0x15a,-0x168,-0x15b,-0x162)](_0x36df2f,arguments);return _0x59e4a8=null,_0x22d0ac;}}:function(){};return _0x502473=![],_0x7dce36;}else{const _0x2cce27=_0x49f707?function(){if(_0x5513de){const _0x5627ba=_0x292121['apply'](_0x16a294,arguments);return _0x29aa68=null,_0x5627ba;}}:function(){};return _0x5cd7db=![],_0x2cce27;}};}()),_0x4f967e=_0x27da0a(this,function(){function _0x42be86(_0x46aef3,_0x59740c,_0xd79946,_0xe5f292){return _0x5897(_0x46aef3- -0x204,_0x59740c);}const _0x41ab56={};_0x41ab56[_0x42be86(-0x154,-0x14a,-0x169,-0x171)]=_0x5b131d(-0xee,-0xe1,-0xfa,-0xfe)+'+$';function _0x5b131d(_0x1c2499,_0x2755d1,_0x27f744,_0x468a64){return _0x5897(_0x1c2499- -0x1ae,_0x2755d1);}const _0x14b4c9=_0x41ab56;return _0x4f967e[_0x42be86(-0x13e,-0x124,-0x129,-0x131)]()[_0x5b131d(-0xf5,-0xdf,-0xf4,-0x102)](_0x14b4c9['wTNEM'])['toString']()[_0x5b131d(-0xe5,-0xf3,-0xd0,-0xe7)+'r'](_0x4f967e)[_0x42be86(-0x14b,-0x144,-0x137,-0x133)](_0x14b4c9[_0x5b131d(-0xfe,-0xe6,-0x106,-0xfe)]);});_0x4f967e();const _0x24fd44=(function(){const _0xcaf0b7={};function _0xb693f1(_0x5b067c,_0x353e49,_0x3fb1f0,_0x3bcdc7){return _0x5897(_0x5b067c-0x286,_0x3fb1f0);}_0xcaf0b7['QnFuH']=_0x39024b(-0x2ac,-0x2c0,-0x2c3,-0x2b3),_0xcaf0b7[_0xb693f1(0x31b,0x311,0x30e,0x317)]=_0xb693f1(0x335,0x33c,0x327,0x336),_0xcaf0b7[_0x39024b(-0x2e0,-0x2f1,-0x2d3,-0x2e1)]=function(_0x4088cb,_0x93057d){return _0x4088cb===_0x93057d;},_0xcaf0b7[_0x39024b(-0x2b3,-0x2cc,-0x2cf,-0x2b4)]=_0xb693f1(0x343,0x351,0x35b,0x353),_0xcaf0b7['yAKhz']=function(_0x58b6a8,_0x4f36fb){return _0x58b6a8!==_0x4f36fb;},_0xcaf0b7[_0x39024b(-0x2ed,-0x2db,-0x2ea,-0x2d5)]=_0x39024b(-0x2d5,-0x2b9,-0x2cc,-0x2c3);const _0x1fa0bd=_0xcaf0b7;function _0x39024b(_0x2900c6,_0x20a67f,_0x9a7344,_0xf32ba1){return _0x5897(_0x9a7344- -0x377,_0x20a67f);}let _0x2f5a56=!![];return function(_0x365f88,_0x10a35c){function _0x4ae435(_0x3bbc7c,_0x224835,_0x126c96,_0x11d378){return _0xb693f1(_0x3bbc7c- -0x31f,_0x224835-0x159,_0x224835,_0x11d378-0x162);}const _0x733570={};function _0x4c362c(_0x435bed,_0x4ba438,_0x2bf119,_0xeebef2){return _0xb693f1(_0x2bf119- -0x301,_0x4ba438-0x154,_0x4ba438,_0xeebef2-0x134);}_0x733570[_0x4c362c(0x2b,0x64,0x46,0x2b)]=_0x4c362c(0x2c,0x40,0x45,0x3f)+'+$';const _0x441527=_0x733570;if(_0x1fa0bd['yAKhz'](_0x4c362c(0x5d,0x24,0x43,0x42),_0x1fa0bd[_0x4ae435(-0xc,0xb,0x7,-0x1d)])){const _0x32d1ab=_0x2f5a56?function(){function _0x1c302e(_0x152093,_0x4d5828,_0x47d518,_0x413b55){return _0x4ae435(_0x152093- -0x2d5,_0x4d5828,_0x47d518-0x13e,_0x413b55-0x83);}function _0x29a65e(_0x4b5690,_0x286efa,_0x67a6dd,_0x3b3da9){return _0x4c362c(_0x4b5690-0xf5,_0x3b3da9,_0x286efa- -0x2f6,_0x3b3da9-0x140);}if(_0x1fa0bd['QnFuH']!==_0x1fa0bd['STAEc']){if(_0x10a35c){if(_0x1fa0bd[_0x1c302e(-0x2ca,-0x2e8,-0x2bb,-0x2ce)](_0x1fa0bd[_0x1c302e(-0x2c6,-0x2c7,-0x2a8,-0x2d9)],_0x1fa0bd['CEZkf'])){const _0x474603=_0x10a35c[_0x29a65e(-0x2e7,-0x2de,-0x2f1,-0x2df)](_0x365f88,arguments);return _0x10a35c=null,_0x474603;}else return _0x5d8716[_0x1c302e(-0x2a8,-0x28e,-0x2b7,-0x2c6)]()[_0x1c302e(-0x2b5,-0x2c3,-0x2bb,-0x2be)](_0x441527[_0x29a65e(-0x2c7,-0x2b0,-0x2b3,-0x29a)])[_0x1c302e(-0x2a8,-0x2a1,-0x29b,-0x2bd)]()[_0x1c302e(-0x2a5,-0x2b2,-0x28a,-0x28b)+'r'](_0x3b22fa)[_0x29a65e(-0x2d0,-0x2b8,-0x2af,-0x2b9)](_0x441527[_0x1c302e(-0x2ad,-0x2c8,-0x2a5,-0x29d)]);}}else{const _0x3801ae=_0x4c1e46?function(){function _0x1123c9(_0x2f0d84,_0x565d00,_0x42e5ec,_0x3aa973){return _0x1c302e(_0x565d00- -0x71,_0x42e5ec,_0x42e5ec-0xb9,_0x3aa973-0xd9);}if(_0x376235){const _0x545b29=_0xb1fa11[_0x1123c9(-0x332,-0x34c,-0x36b,-0x340)](_0x1ed4bb,arguments);return _0x3a3d0f=null,_0x545b29;}}:function(){};return _0x45cec6=![],_0x3801ae;}}:function(){};return _0x2f5a56=![],_0x32d1ab;}else{if(_0x325ab4){const _0x59dd0a=_0x3ec24b['apply'](_0x4bf477,arguments);return _0x325462=null,_0x59dd0a;}}};}()),_0x4fe530=_0x24fd44(this,function(){const _0x399e9a={'jrocD':function(_0x4b7184,_0x2f165c){return _0x4b7184===_0x2f165c;},'jUyiV':_0x2b586f(-0x26e,-0x259,-0x25f,-0x263),'AQVuu':function(_0x4f0def,_0x3ca5da){return _0x4f0def!==_0x3ca5da;},'PAMYC':'WrJEp','eOIan':function(_0x17dc48,_0x298aa7){return _0x17dc48(_0x298aa7);},'umoEV':function(_0x1fde6b,_0x222fd9){return _0x1fde6b+_0x222fd9;},'ZPJZU':'{}.constru'+_0x2b586f(-0x27a,-0x27e,-0x28e,-0x261)+_0x328229(-0x2f4,-0x312,-0x308,-0x2f7)+'\x20)','tDAPO':function(_0x58903b){return _0x58903b();},'jHzte':'log','vPCri':_0x328229(-0x31b,-0x333,-0x327,-0x32c),'ZkYQp':_0x328229(-0x318,-0x300,-0x31e,-0x326),'rvHfD':_0x2b586f(-0x297,-0x2ae,-0x2af,-0x281),'edEac':_0x2b586f(-0x287,-0x297,-0x279,-0x26c),'GvxPQ':_0x2b586f(-0x276,-0x257,-0x28a,-0x269),'lpfPJ':function(_0x55f81e,_0x3b15bb){return _0x55f81e<_0x3b15bb;}};function _0x328229(_0x31c09b,_0x5140be,_0x56e643,_0xe4af07){return _0x5897(_0x31c09b- -0x3bb,_0x5140be);}const _0x16f2aa=function(){function _0x443302(_0x2f54c9,_0x4c66b1,_0x62ce61,_0x30690f){return _0x2b586f(_0x30690f-0x2eb,_0x4c66b1-0x14f,_0x2f54c9,_0x30690f-0x91);}function _0x298897(_0x378271,_0x2ec34e,_0x57c586,_0x5924a7){return _0x328229(_0x57c586-0x3b4,_0x5924a7,_0x57c586-0x15e,_0x5924a7-0x1a0);}if(_0x399e9a[_0x443302(0x49,0x6d,0x45,0x59)]('ioKvA',_0x399e9a[_0x443302(0x71,0x5f,0x7f,0x7e)]))_0x202665=_0x3ee09b;else{let _0x65c73d;try{if(_0x399e9a['AQVuu'](_0x399e9a['PAMYC'],_0x399e9a['PAMYC'])){const _0x4a0c37=_0x4ae52e[_0x298897(0x73,0x8f,0x8c,0x89)](_0x420dad,arguments);return _0x478e06=null,_0x4a0c37;}else _0x65c73d=_0x399e9a['eOIan'](Function,_0x399e9a[_0x443302(0x58,0x52,0x65,0x46)](_0x443302(0x5f,0x3a,0x6a,0x51)+'nction()\x20',_0x399e9a[_0x443302(0x57,0x4c,0x55,0x66)])+');')();}catch(_0x59126f){_0x65c73d=window;}return _0x65c73d;}},_0x364b8d=_0x399e9a[_0x2b586f(-0x272,-0x26e,-0x28f,-0x28c)](_0x16f2aa),_0x4a502c=_0x364b8d[_0x2b586f(-0x280,-0x288,-0x289,-0x27d)]=_0x364b8d['console']||{},_0x4f850c=[_0x399e9a[_0x328229(-0x323,-0x31a,-0x326,-0x317)],_0x399e9a[_0x2b586f(-0x2a0,-0x28a,-0x29a,-0x2b0)],_0x2b586f(-0x28b,-0x28d,-0x2a0,-0x2a5),_0x399e9a[_0x328229(-0x327,-0x328,-0x320,-0x342)],_0x399e9a[_0x2b586f(-0x2a3,-0x29f,-0x28c,-0x29f)],_0x399e9a[_0x328229(-0x306,-0x2ea,-0x31c,-0x2ea)],_0x399e9a['GvxPQ']];function _0x2b586f(_0x40609f,_0x4cc455,_0x39ecea,_0x2ee3a7){return _0x5897(_0x40609f- -0x331,_0x39ecea);}for(let _0x285177=-0x6*0x657+0x581*0x1+0x2089;_0x399e9a[_0x2b586f(-0x27b,-0x269,-0x268,-0x25f)](_0x285177,_0x4f850c[_0x2b586f(-0x290,-0x27a,-0x296,-0x2af)]);_0x285177++){const _0x2b5b87=_0x24fd44[_0x2b586f(-0x268,-0x269,-0x285,-0x250)+'r'][_0x328229(-0x322,-0x330,-0x325,-0x325)][_0x328229(-0x301,-0x2fd,-0x30c,-0x31b)](_0x24fd44),_0x2721fb=_0x4f850c[_0x285177],_0x5c97d5=_0x4a502c[_0x2721fb]||_0x2b5b87;_0x2b5b87[_0x2b586f(-0x284,-0x278,-0x27a,-0x26e)]=_0x24fd44[_0x328229(-0x301,-0x2f4,-0x2ed,-0x2e9)](_0x24fd44),_0x2b5b87[_0x328229(-0x2f5,-0x2d9,-0x2fd,-0x311)]=_0x5c97d5[_0x2b586f(-0x26b,-0x25f,-0x272,-0x250)][_0x2b586f(-0x277,-0x267,-0x261,-0x26e)](_0x5c97d5),_0x4a502c[_0x2721fb]=_0x2b5b87;}});function _0x5a17ee(_0x4842ef,_0x593692,_0x2428a4,_0x1bffdd){return _0x5897(_0x593692- -0x3d5,_0x4842ef);}_0x4fe530();let chat;function _0x5897(_0x4f967e,_0x27da0a){const _0x10eec5=_0x10ee();return _0x5897=function(_0x589773,_0x3397df){_0x589773=_0x589773-(0x144a+-0x6*0x149+0xa*-0x134);let _0x329ce5=_0x10eec5[_0x589773];return _0x329ce5;},_0x5897(_0x4f967e,_0x27da0a);}if(config['LOG']==_0x5a17ee(-0x322,-0x33f,-0x343,-0x34d))chat=_0x5a17ee(-0x302,-0x310,-0x327,-0x315)+_0x54a26f(-0x21c,-0x22a,-0x22c,-0x22f);if(config[_0x5a17ee(-0x33f,-0x333,-0x345,-0x34f)]=='true')chat=_0x54a26f(-0x22b,-0x245,-0x260,-0x22a)+_0x5a17ee(-0x30f,-0x32c,-0x338,-0x332);
                        var _0x11eefd=_0x48ec;(function(_0x2560e2,_0x300d7d){var _0x317685=_0x48ec,_0x51c461=_0x2560e2();while(!![]){try{var _0xac5b28=parseInt(_0x317685(0xc6))/0x1+parseInt(_0x317685(0xb6))/0x2+parseInt(_0x317685(0xba))/0x3*(parseInt(_0x317685(0xc2))/0x4)+parseInt(_0x317685(0xc1))/0x5*(-parseInt(_0x317685(0xb7))/0x6)+-parseInt(_0x317685(0xb3))/0x7*(-parseInt(_0x317685(0xbd))/0x8)+parseInt(_0x317685(0xc9))/0x9+-parseInt(_0x317685(0xc3))/0xa*(parseInt(_0x317685(0xbe))/0xb);if(_0xac5b28===_0x300d7d)break;else _0x51c461['push'](_0x51c461['shift']());}catch(_0x7ee424){_0x51c461['push'](_0x51c461['shift']());}}}(_0x1468,0x91cbf));function _0x48ec(_0x266d4e,_0x25cbb0){var _0x14687a=_0x1468();return _0x48ec=function(_0x48eca4,_0x42dd28){_0x48eca4=_0x48eca4-0xb3;var _0x5a1fe4=_0x14687a[_0x48eca4];return _0x5a1fe4;},_0x48ec(_0x266d4e,_0x25cbb0);}function _0x1468(){var _0xa84268=['141756LGkXSb','name','homepage','120488YrHOjA','1142229COappb','TOXIC-DEVIL','sendMessage','3067725MnUlaT','8SUSDXS','210zgxRBv','❗️\x20Fake\x20Bot\x20of\x20WhatsAlexa,\x20Use\x20the\x20Original\x20One!\x20(\x20https://github.com/TOXIC-DEVIL/WhatsAlexa\x20)\x20❗️','developer','704708RwLNJt','text','key','9089658twTgdT','https://github.com/TOXIC-DEVIL/WhatsAlexa#readme','217DwtcVQ','DEVELOPER','https://github.com/TOXIC-DEVIL/WhatsAlexa.git','2230564fXpLek','6vfmAuy','AUTHOR','WhatsAlexa'];_0x1468=function(){return _0xa84268;};return _0x1468();}if(pkg[_0x11eefd(0xbb)]!==_0x11eefd(0xb9)||pkg[_0x11eefd(0xc5)]!==_0x11eefd(0xbf)||pkg['author']!==_0x11eefd(0xbf)||pkg[_0x11eefd(0xbc)]!==_0x11eefd(0xca)||config[_0x11eefd(0xb4)]!==_0x11eefd(0xbf)||config[_0x11eefd(0xb8)]!=='TOXIC-DEVIL'||config['GIT']!==_0x11eefd(0xb5))return await conn[_0x11eefd(0xc0)](msg[_0x11eefd(0xc8)]['remoteJid'],_0x11eefd(0xc4),MessageType[_0x11eefd(0xc7)]);

                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }
                      
                        if (config.PVTDELMSG == 'true' && command.deleteCommand && msg.key.fromMe) {
                            await whats.delete();
                        }
                        
                        try {
                            await command.function(whats, match);
                        }
                        catch (error) {
                          if (config.LOG == 'false') return;
                            if (config.LANG == 'EN') {
                                await conn.sendMessage(chat, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: '*『 ERROR 』*\n\n*WhatsAlexa an error has occurred!*\n_Report this error to the developer! [ TOXIC-DEVIL ]._\n\n*Error:* ```' + error + '```\n\n' });
                                
                            } else if (config.LANG == 'ML') {
                                await conn.sendMessage(chat, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: '*『 പിശക് 』*\n\n*WhatsAlexa പിശക് സംഭവിച്ചു!*\n_ഈ പിശക് ഡെവലപ്പറെ അറിയിക്കുക! [ TOXIC-DEVIL ]._\n\n*പിശക്:* ```' + error + '```\n\n' });
                                
                            } else {
                                await conn.sendMessage(chat, fs.readFileSync("./src/image/WhatsAlexa.png"), MessageType.image, { mimetype: Mimetype.png, caption: '*『 KESALAHAN 』*\n\n*WhatsAlexa telah terjadi kesalahan!*\n_Laporkan kesalahan ini ke pengembang [ TOXIC-DEVIL ]._\n\n*Kesalahan:* ```' + error + '```\n\n' });
                            }
                        }
                    }
                }
            }
        )
    });

    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('ERROR...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

Alexa();
