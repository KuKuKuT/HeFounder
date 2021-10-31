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
if (Config.LANG == 'EN') warning = 'We are not responsible for any consequences that may arise from use or misuse of Bot, You are responsible for all consequences also the responsibility of sharing Images, Videos, Stickers, Audios etc.. are yours!', language = 'English', FMSG = 'Have a Nice Day 💖\n\n```Git:``` *'+Config.GIT+'*\n\n```Thank You For using WhatsAlexa 💕```\n*© WhatsAlexa, Made By Toxic Devil*\n\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*',  MSG = '*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\nHi user,\n*'+warning+'*\n\n*◆ BOT INFO ◆*\n\n```▣ Developer:``` *TOXIC DEVIL*\n```▣ Owner:``` *'+Config.OWNER+'*\n```▣ Contact Owner:``` *wa.me/'+Config.OWNERNUM+'*\n```▣ Version:``` *'+Config.VERSION+'*\n```▣ Branch:``` *'+Config.BRANCH+'*\n```▣ Language:``` *'+language+'*\n```▣ Auto Bio:``` *'+auto_bio+'*\n```▣ Antilink:``` *'+anti_link+'*\n```▣ Work Type:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *Commands* ⇓ ∎\n\n'
if (Config.LANG == 'ML') warning = 'ബോട്ടിന്റെ ഉപയോഗത്തിൽ നിന്നോ ദുരുപയോഗത്തിൽ നിന്നോ ഉണ്ടാകുന്ന അനന്തരഫലങ്ങൾക്ക് ഞങ്ങൾ ഉത്തരവാദികളല്ല, ചിത്രങ്ങൾ, വീഡിയോകൾ, സ്റ്റിക്കറുകൾ, ഓഡിയോകൾ മുതലായവ പങ്കിടുന്നതിന്റെ ഉത്തരവാദിത്തവും നിങ്ങളാണ്.', language = 'മലയാളം', FMSG = 'ഒരു നല്ല ദിനം ആശംസിക്കുന്നു 💖\n\n```ഗിറ്റ്:``` *'+Config.GIT+'*\n\n```WhatsAlexa ഉപയോഗിച്ചതിന് നന്ദി 💕```\n*© WhatsAlexa, ഉണ്ടാക്കിയത് Toxic Devil*\n\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*', MSG = '*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\nനമസ്കാരം user,\n*'+warning+'*\n\n*◆ ബോട്ട് വിവരം ◆*\n\n```▣ ഡെവലപ്പർ:``` *TOXIC DEVIL*\n```▣ ഉടമ:``` *'+Config.OWNER+'*\n```▣ ഉടമയുമായി ബന്ധപ്പെടുക:``` *wa.me/'+Config.OWNERNUM+'*\n```▣ Version:``` *'+Config.VERSION+'*\n```▣ Branch:``` *'+Config.BRANCH+'*\n```▣ ഭാഷ:``` *'+language+'*\n```▣ ഓട്ടോ ബയോ:``` *'+auto_bio+'*\n```▣ ആന്റി ലിങ്ക്:``` *'+anti_link+'*\n```▣ വര്‍ക്ക്‌ തരം:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *കമാൻഡുകൾ* ⇓ ∎\n\n'
if (Config.LANG == 'ID') warning = 'Kami tidak bertanggung jawab atas segala akibat yang mungkin timbul dari penggunaan atau penyalahgunaan Bot, Anda bertanggung jawab atas semua konsekuensi juga tanggung jawab berbagi Gambar, Video, Stiker, Audio dll. adalah milik Anda!', language = 'Indonasian', FMSG = 'Semoga harimu menyenangkan 💖\n\n```Git:``` *'+Config.GIT+'*\n\n```Terima kasih telah menggunakan WhatsAlexa 💕```\n*© WhatsAlexa, Dibuat oleh Toxic Devil*\n\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*', MSG = '*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\nHai user,\n*'+warning+'*\n\n*◆ INFORMASI BOT ◆*\n\n```▣ Pengembang:``` *TOXIC DEVIL*\n```▣ Pemilik:``` *'+Config.OWNER+'*\n```▣ Version:``` *'+Config.VERSION+'*\n```▣ Branch:``` *'+Config.BRANCH+'*\n```▣ Hubungi Pemilik:``` *wa.me/'+Config.OWNERNUM+'*\n```▣ Bahasa:``` *'+language+'*\n```▣ Bio otomatis:``` *'+auto_bio+'*\n```▣ Anti Tautan:``` *'+anti_link+'*\n```▣ Jenis Pekerjaan:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *Perintah* ⇓ ∎\n\n'

    WhatsAlexa.addCommand({pattern: 'list ?(.*)', fromMe: td, dontAddCommandList: true}, (async (message, match) => {
       
            WhatsAlexa.commands.map(
                async (command) =>  {
                    if (command.hideFromCommandList || command.pattern === undefined) return;
                    try {
                        var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
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
