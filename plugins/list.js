let { newCommand } require('../events');
let WhatsAlexa = require('../events');
let Config = require('../config');
let fs = require('fs');
let {MessageType} = require('@adiwajshing/baileys');
let Language = require('../language');
let Lang = Language.getString('list');
let td = Config.WORKTYPE == 'public' ? false : true

var LOADING = ''
var warning = ''
var anti_link = ''
var auto_bio = ''
var language = ''
var MSG = ''
var FMSG = ''
if (Config.ANTILINK == 'true') anti_link = 'On'
if (Config.ANTILINK == 'false') anti_link = 'Off'
if (Config.AUTOBIO == 'true') auto_bio = 'On'
if (Config.AUTOBIO == 'false') auto_bio = 'Off'
if (Config.LANG == 'EN') warning = 'We are not responsible for any consequences that may arise from use or misuse of Bot, You are responsible for all consequences also the responsibility of sharing Images, Videos, Stickers, Audios etc.. are yours!', language = 'English', FMSG = 'Have a Nice Day š\n\n```Git:``` *'+Config.GIT+'*\n\n```Thank You For using WhatsAlexa š```\n*Ā© WhatsAlexa, Made By Toxic Devil*\n\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n   *ā¦āāā¦ Whats šø Alexa ā¦āāā¦*\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*',  MSG = '*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n   *ā¦āāā¦ Whats šø Alexa ā¦āāā¦*\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n\nHi user,\n*'+warning+'*\n\n*ā BOT INFO ā*\n\n```ā£ Developer:``` *TOXIC DEVIL*\n```ā£ Owner:``` *'+Config.OWNER+'*\n```ā£ Contact Owner:``` *wa.me/'+Config.OWNERNUM+'*\n```ā£ Version:``` *'+Config.VERSION+'*\n```ā£ Branch:``` *'+Config.BRANCH+'*\n```ā£ Language:``` *'+language+'*\n```ā£ Auto Bio:``` *'+auto_bio+'*\n```ā£ Antilink:``` *'+anti_link+'*\n```ā£ Work Type:``` *'+Config.WORKTYPE+'*\n\nā ā *Commands* ā ā\n\n'
if (Config.LANG == 'ML') warning = 'ą“¬ąµą“ąµą“ą“æą“Øąµą“±ąµ ą“ą“Ŗą“Æąµą“ą“¤ąµą“¤ą“æąµ½ ą“Øą“æą“Øąµą“Øąµ ą“¦ąµą“°ąµą“Ŗą“Æąµą“ą“¤ąµą“¤ą“æąµ½ ą“Øą“æą“Øąµą“Øąµ ą“ą“£ąµą“ą“¾ą“ąµą“Øąµą“Ø ą“ą“Øą“Øąµą“¤ą“°ą“«ą“²ą“ąµą“ąµ¾ą“ąµą“ąµ ą“ą“ąµą“ąµ¾ ą“ą“¤ąµą“¤ą“°ą“µą“¾ą“¦ą“æą“ą“³ą“²ąµą“², ą“ą“æą“¤ąµą“°ą“ąµą“ąµ¾, ą“µąµą“”ą“æą“Æąµą“ąµ¾, ą“øąµą“±ąµą“±ą“æą“ąµą“ą“±ąµą“ąµ¾, ą“ą“”ą“æą“Æąµą“ąµ¾ ą“®ąµą“¤ą“²ą“¾ą“Æą“µ ą“Ŗą“ąµą“ą“æą“ąµą“Øąµą“Øą“¤ą“æą“Øąµą“±ąµ ą“ą“¤ąµą“¤ą“°ą“µą“¾ą“¦ą“æą“¤ąµą“¤ą“µąµą“ ą“Øą“æą“ąµą“ą“³ą“¾ą“£ąµ.', language = 'ą“®ą“²ą“Æą“¾ą“³ą“', FMSG = 'ą“ą“°ąµ ą“Øą“²ąµą“² ą“¦ą“æą“Øą“ ą“ą“¶ą“ą“øą“æą“ąµą“ąµą“Øąµą“Øąµ š\n\n```ą“ą“æą“±ąµą“±ąµ:``` *'+Config.GIT+'*\n\n```WhatsAlexa ą“ą“Ŗą“Æąµą“ą“æą“ąµą“ą“¤ą“æą“Øąµ ą“Øą“Øąµą“¦ą“æ š```\n*Ā© WhatsAlexa, ą“ą“£ąµą“ą“¾ą“ąµą“ą“æą“Æą“¤ąµ Toxic Devil*\n\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n   *ā¦āāā¦ Whats šø Alexa ā¦āāā¦*\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*', MSG = '*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n   *ā¦āāā¦ Whats šø Alexa ā¦āāā¦*\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n\ną“Øą“®ą“øąµą“ą“¾ą“°ą“ user,\n*'+warning+'*\n\n*ā ą“¬ąµą“ąµą“ąµ ą“µą“æą“µą“°ą“ ā*\n\n```ā£ ą“”ąµą“µą“²ą“Ŗąµą“Ŗąµ¼:``` *TOXIC DEVIL*\n```ā£ ą“ą“ą“®:``` *'+Config.OWNER+'*\n```ā£ ą“ą“ą“®ą“Æąµą“®ą“¾ą“Æą“æ ą“¬ą“Øąµą“§ą“Ŗąµą“Ŗąµą“ąµą“:``` *wa.me/'+Config.OWNERNUM+'*\n```ā£ Version:``` *'+Config.VERSION+'*\n```ā£ Branch:``` *'+Config.BRANCH+'*\n```ā£ ą“­ą“¾ą“·:``` *'+language+'*\n```ā£ ą“ą“ąµą“ąµ ą“¬ą“Æąµ:``` *'+auto_bio+'*\n```ā£ ą“ą“Øąµą“±ą“æ ą“²ą“æą“ąµą“ąµ:``` *'+anti_link+'*\n```ā£ ą“µą“°ąµāą“ąµą“ąµā ą“¤ą“°ą“:``` *'+Config.WORKTYPE+'*\n\nā ā *ą“ą“®ą“¾ąµ»ą“”ąµą“ąµ¾* ā ā\n\n'
if (Config.LANG == 'ID') warning = 'Kami tidak bertanggung jawab atas segala akibat yang mungkin timbul dari penggunaan atau penyalahgunaan Bot, Anda bertanggung jawab atas semua konsekuensi juga tanggung jawab berbagi Gambar, Video, Stiker, Audio dll. adalah milik Anda!', language = 'Indonasian', FMSG = 'Semoga harimu menyenangkan š\n\n```Git:``` *'+Config.GIT+'*\n\n```Terima kasih telah menggunakan WhatsAlexa š```\n*Ā© WhatsAlexa, Dibuat oleh Toxic Devil*\n\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n   *ā¦āāā¦ Whats šø Alexa ā¦āāā¦*\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*', MSG = '*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n   *ā¦āāā¦ Whats šø Alexa ā¦āāā¦*\n*āāāāāāāāā¦ā¦āÆā¦ā¦āāāāāāāāāŗ*\n\nHai user,\n*'+warning+'*\n\n*ā INFORMASI BOT ā*\n\n```ā£ Pengembang:``` *TOXIC DEVIL*\n```ā£ Pemilik:``` *'+Config.OWNER+'*\n```ā£ Version:``` *'+Config.VERSION+'*\n```ā£ Branch:``` *'+Config.BRANCH+'*\n```ā£ Hubungi Pemilik:``` *wa.me/'+Config.OWNERNUM+'*\n```ā£ Bahasa:``` *'+language+'*\n```ā£ Bio otomatis:``` *'+auto_bio+'*\n```ā£ Anti Tautan:``` *'+anti_link+'*\n```ā£ Jenis Pekerjaan:``` *'+Config.WORKTYPE+'*\n\nā ā *Perintah* ā ā\n\n'

    WhatsAlexa.addCommand({pattern: 'list ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {
       
            WhatsAlexa.commands.map(
                async (command) =>  {
                    if (command.hideFromCommandList || command.pattern === undefined) return;
                    try {
                        var match = command.pattern.toString().match(/(\W*)([A-Za-zÄĆ¼ÅiĆ¶Ć§1234567890]*)/);
                    } catch {
                        var match = [command.pattern];
                    }
    
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
     
                    const cg = {
                                 MISC: '*>[ MISC MENU ]<*'
                                 ADMIN: '*>[ ADMIN MENU ]<*'
                                 OWNER: '*>[ OWNER MENU ]<*'
                                 DEV: '*>[ DEVELOPER MENU ]<*'
                                }
         
                    var CaT = ''
                    if (command.category == 'MISC') CaT = cg.MISC
                    if (command.category == 'ADMIN') CaT = cg.ADMIN
                    if (command.category == 'OWNER') CaT = cg.OWNER
                    if (command.category == 'DEV') CaT = cg.DEV

                    var M = [];
                    var A = [];
                    var O = [];
                    var D = [];
                    if (!command.category) M.push(match);
                    if (command.category == 'MISC') M.push(match);
                    if (command.category == 'ADMIN') A.push(match);
                    if (command.category == 'OWNER') O.push(match);
                    if (command.category == 'DEV') D.push(match);
                    
                    let getMCMD = CaT + '\n\n' + HANDLER + match.map(Mcmd => M).join('\n')
                    let getACMD = CaT + '\n\n' + HANDLER + match.map(Acmd => A).join('\n')
                    let getOCMD = CaT + '\n\n' + HANDLER + match.map(Ocmd => O).join('\n')
                    let getDCMD = CaT + '\n\n' + HANDLER + match.map(Dcmd => D).join('\n')

                    CMD_HELP += `${getMCMD}\n\n${getACMD}\n\n${getOCMD}\n\n${getDCMD}`;

                }
            );
            
          await message.client.sendMessage(
                message.jid, MSG + CMD_HELP + FMSG, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
    }));
