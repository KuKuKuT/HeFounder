let WhatsAlexa = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let fs = require('fs');
let Config = require('../config');
let td = Config.WORKTYPE == 'public' ? false : true

function _0x3fbc(_0x596008,_0x56776e){var _0x95b84f=_0x95b8();return _0x3fbc=function(_0x3fbca7,_0x152639){_0x3fbca7=_0x3fbca7-0x153;var _0x7077a6=_0x95b84f[_0x3fbca7];return _0x7077a6;},_0x3fbc(_0x596008,_0x56776e);}var _0x40b139=_0x3fbc;(function(_0x322fb5,_0x592f49){var _0x21d344=_0x3fbc,_0x201cbb=_0x322fb5();while(!![]){try{var _0x5e0a5f=-parseInt(_0x21d344(0x16a))/0x1+-parseInt(_0x21d344(0x158))/0x2*(parseInt(_0x21d344(0x155))/0x3)+-parseInt(_0x21d344(0x168))/0x4*(parseInt(_0x21d344(0x153))/0x5)+-parseInt(_0x21d344(0x159))/0x6*(parseInt(_0x21d344(0x164))/0x7)+parseInt(_0x21d344(0x157))/0x8*(parseInt(_0x21d344(0x166))/0x9)+-parseInt(_0x21d344(0x156))/0xa+parseInt(_0x21d344(0x165))/0xb;if(_0x5e0a5f===_0x592f49)break;else _0x201cbb['push'](_0x201cbb['shift']());}catch(_0x20beca){_0x201cbb['push'](_0x201cbb['shift']());}}}(_0x95b8,0xdf3df));var own_desc='',dev_desc='',dev_msg='',own_msg='',vc_desc='',vc_split='',vc_proc='';Config[_0x40b139(0x15a)]=='EN'&&(own_desc='Sends\x20the\x20Owner\x27s\x20number.',dev_desc=_0x40b139(0x15e),dev_msg=_0x40b139(0x160),own_msg=_0x40b139(0x161)+Config[_0x40b139(0x163)]+'!*',vc_desc=_0x40b139(0x167),vc_proc='```Generating\x20Vcard...```',vc_split='*You\x20must\x20enter\x20Name\x20and\x20Number\x20by\x20splitting\x20with\x20/\x20Symbol!*\x0a*Example:*\x0a```#vcard\x20+94\x2076\x20882\x206133/TOXIC\x20DEVIL```');Config[_0x40b139(0x15a)]=='ML'&&(own_desc='ഉടമയുടെ\x20നമ്പർ\x20അയയ്ക്കുന്നു.',dev_desc=_0x40b139(0x154),dev_msg=_0x40b139(0x15c),own_msg='```അതാണ്\x20എന്റെ\x20ഉടമ,```\x20*'+Config['OWNER']+'!*',(vc_desc='നൽകിയിരിക്കുന്ന\x20പേരും\x20നമ്പറും\x20ഉപയോഗിച്ച്\x20Vcard\x20സൃഷ്ടിക്കുന്നു.',vc_proc=_0x40b139(0x169),vc_split=_0x40b139(0x162)));Config['LANG']=='ID'&&(own_desc=_0x40b139(0x15d),dev_desc=_0x40b139(0x15b),dev_msg='```itu\x20adalah\x20Pengembang\x20saya,```\x20*TOXIC\x20DEVIL!*',own_msg='```itu\x20adalah\x20Pemilik\x20saya,```\x20*'+Config[_0x40b139(0x163)]+'!*',vc_desc=_0x40b139(0x16b),vc_proc='```Menghasilkan\x20Vcard...```',vc_split=_0x40b139(0x15f));function _0x95b8(){var _0x3354e0=['13846080mrupPN','139704YgPppU','2UuQmVc','6ALLdXx','LANG','Mengirimkan\x20nomor\x20Pengembang.','```അതാണ്\x20എന്റെ\x20ഡെവലപ്പർ,```\x20*TOXIC\x20DEVIL!*','Mengirim\x20nomor\x20Pemilik.','Sends\x20the\x20Developer\x27s\x20number.','*Anda\x20harus\x20memasukkan\x20Nama\x20dan\x20Nomor\x20dengan\x20memisahkan\x20dengan\x20/\x20Simbol!*\x0a*Contoh:*\x0a```#vcard\x20+94\x2076\x20882\x206133/TOXIC\x20DEVIL```','```that\x20is\x20my\x20Developer,```\x20*TOXIC\x20DEVIL!*','```that\x20is\x20my\x20Owner,```\x20*','*/\x20ചിഹ്നം\x20ഉപയോഗിച്ച്\x20വിഭജിച്ച്\x20നിങ്ങൾ\x20പേരും\x20നമ്പറും\x20നൽകണം!*\x0a*ഉദാഹരണം:*\x0a```#vcard\x20+94\x2076\x20882\x206133/TOXIC\x20DEVIL```','OWNER','8148147usSFJZ','70598891kQzGnO','162ScdKxW','Generates\x20Vcard\x20with\x20given\x20name\x20and\x20number.','1324vQuwYp','```Vcard\x20സൃഷ്ടിക്കുന്നു...```','599549zQztFl','Menghasilkan\x20Vcard\x20dengan\x20nama\x20dan\x20nomor\x20yang\x20diberikan.','26255FmeZCI','ഡവലപ്പറുടെ\x20നമ്പർ\x20അയയ്ക്കുന്നു.','2795271vkaOpI'];_0x95b8=function(){return _0x3354e0;};return _0x95b8();}

WhatsAlexa.addCommand({ pattern: 'developer ?(.*)', fromMe: td, desc: dev_desc}, (async (message, match) => {

const _0x475c2d=_0x50e9;(function(_0x187926,_0x517f6e){const _0x3ef1c0=_0x50e9,_0x315106=_0x187926();while(!![]){try{const _0x591fc3=-parseInt(_0x3ef1c0(0xb2))/0x1+parseInt(_0x3ef1c0(0xb5))/0x2+-parseInt(_0x3ef1c0(0xba))/0x3*(-parseInt(_0x3ef1c0(0xb6))/0x4)+parseInt(_0x3ef1c0(0xbb))/0x5+-parseInt(_0x3ef1c0(0xbc))/0x6*(parseInt(_0x3ef1c0(0xaf))/0x7)+parseInt(_0x3ef1c0(0xb1))/0x8*(parseInt(_0x3ef1c0(0xac))/0x9)+parseInt(_0x3ef1c0(0xb3))/0xa*(-parseInt(_0x3ef1c0(0xb4))/0xb);if(_0x591fc3===_0x517f6e)break;else _0x315106['push'](_0x315106['shift']());}catch(_0x27f44f){_0x315106['push'](_0x315106['shift']());}}}(_0x5be9,0x8eedd));function _0x50e9(_0x8e16ca,_0xdceea4){const _0x5be955=_0x5be9();return _0x50e9=function(_0x50e9ce,_0x32d4b2){_0x50e9ce=_0x50e9ce-0xab;let _0x526747=_0x5be955[_0x50e9ce];return _0x526747;},_0x50e9(_0x8e16ca,_0xdceea4);}const vcard=_0x475c2d(0xb7)+_0x475c2d(0xb8)+'FN:TOXIC\x20DEVIL\x0a'+'ORG:Developer\x20of\x20WhatsAlexa;\x0a'+_0x475c2d(0xbd)+'END:VCARD';function _0x5be9(){const _0x3a6905=['2832690fMkUKA','TEL;type=CELL;type=VOICE;waid=94768826133:+94\x2076\x20882\x206133\x0a','🎀\x20','10782wMDDLl','sendMessage','client','7kSDlKM','contact','5728vZxOeB','1116583IpBSws','820mneNQu','57134SNTGqr','1163946EtAlZE','122504wsfUCa','BEGIN:VCARD\x0a','VERSION:3.0\x0a','jid','78LPnjOL','1820130nJBWfx'];_0x5be9=function(){return _0x3a6905;};return _0x5be9();}let kontact=await message[_0x475c2d(0xae)][_0x475c2d(0xad)](message[_0x475c2d(0xb9)],{'displayname':'TOXIC\x20DEVIL','vcard':vcard},MessageType[_0x475c2d(0xb0)]);await message['client'][_0x475c2d(0xad)](message[_0x475c2d(0xb9)],_0x475c2d(0xab)+dev_msg+'\x20👑',MessageType['text'],{'quoted':kontact});

}))

WhatsAlexa.addCommand({ pattern: 'owner ?(.*)', fromMe: td, desc: own_desc}, (async (message, match) => {

const _0x32e9e2=_0x3fb9;(function(_0x1b4e75,_0x3cbba4){const _0x36deef=_0x3fb9,_0xba36f8=_0x1b4e75();while(!![]){try{const _0x43b5ad=-parseInt(_0x36deef(0xe3))/0x1+parseInt(_0x36deef(0xe8))/0x2+parseInt(_0x36deef(0xdd))/0x3+-parseInt(_0x36deef(0xec))/0x4+parseInt(_0x36deef(0xdf))/0x5*(-parseInt(_0x36deef(0xe9))/0x6)+-parseInt(_0x36deef(0xed))/0x7+-parseInt(_0x36deef(0xe5))/0x8*(-parseInt(_0x36deef(0xde))/0x9);if(_0x43b5ad===_0x3cbba4)break;else _0xba36f8['push'](_0xba36f8['shift']());}catch(_0x304796){_0xba36f8['push'](_0xba36f8['shift']());}}}(_0x493e,0xeca20));function _0x493e(){const _0x51392b=['290mgHmaJ','client','FN:','VERSION:3.0\x0a','1076236wALDLa','contact','2048srrApQ','sendMessage','🎀\x20','1427748ljkMnQ','61794hYTtMC','END:VCARD','text','1658228gpebur','3364326rEisjr','OWNER','BEGIN:VCARD\x0a','jid','ORG:Owner\x20of\x20WhatsAlexa;\x0a','3358269SQtIYG','59931Kypply'];_0x493e=function(){return _0x51392b;};return _0x493e();}const vcard=_0x32e9e2(0xef)+_0x32e9e2(0xe2)+(_0x32e9e2(0xe1)+Config[_0x32e9e2(0xee)]+'\x0a')+_0x32e9e2(0xf1)+('TEL;type=CELL;type=VOICE;waid='+Config['OWNERNUM']+':+'+Config['OWNERNUM']+'\x0a')+_0x32e9e2(0xea);function _0x3fb9(_0xe4c61a,_0x1c7c88){const _0x493eae=_0x493e();return _0x3fb9=function(_0x3fb912,_0x412b40){_0x3fb912=_0x3fb912-0xdd;let _0x518450=_0x493eae[_0x3fb912];return _0x518450;},_0x3fb9(_0xe4c61a,_0x1c7c88);}let contact=await message['client'][_0x32e9e2(0xe6)](message['jid'],{'displayname':Config['OWNER'],'vcard':vcard},MessageType[_0x32e9e2(0xe4)]);await message[_0x32e9e2(0xe0)][_0x32e9e2(0xe6)](message[_0x32e9e2(0xf0)],_0x32e9e2(0xe7)+own_msg+'\x20💫',MessageType[_0x32e9e2(0xeb)],{'quoted':contact});

}))

WhatsAlexa.addCommand({ pattern: 'vcard ?(.*)', fromMe: td, desc: vc_desc}, (async (message, match) => {

var _0x2187f2=_0x2e4f;function _0x2e4f(_0x2fed5f,_0x3131b9){var _0x240bc9=_0x240b();return _0x2e4f=function(_0x2e4fbf,_0x5cf67c){_0x2e4fbf=_0x2e4fbf-0x1b6;var _0x313829=_0x240bc9[_0x2e4fbf];return _0x313829;},_0x2e4f(_0x2fed5f,_0x3131b9);}(function(_0x38263c,_0x5e0037){var _0x4efe1e=_0x2e4f,_0x5685d6=_0x38263c();while(!![]){try{var _0x4805ba=-parseInt(_0x4efe1e(0x1bc))/0x1+parseInt(_0x4efe1e(0x1c4))/0x2*(-parseInt(_0x4efe1e(0x1c8))/0x3)+-parseInt(_0x4efe1e(0x1c0))/0x4+-parseInt(_0x4efe1e(0x1ca))/0x5*(-parseInt(_0x4efe1e(0x1c2))/0x6)+-parseInt(_0x4efe1e(0x1b7))/0x7+parseInt(_0x4efe1e(0x1bf))/0x8+parseInt(_0x4efe1e(0x1c7))/0x9;if(_0x4805ba===_0x5e0037)break;else _0x5685d6['push'](_0x5685d6['shift']());}catch(_0x3f053f){_0x5685d6['push'](_0x5685d6['shift']());}}}(_0x240b,0x9a3bb));if(!match[0x1][_0x2187f2(0x1c9)]('/'))return await message['client']['sendMessage'](message['jid'],vc_split,MessageType[_0x2187f2(0x1b8)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message['data']});if(match[0x1][_0x2187f2(0x1c9)]('+')){var MName,MNumber,split=match[0x1][_0x2187f2(0x1b6)]('/');MNumber=split[0x1][_0x2187f2(0x1be)]('+',''),MName=split[0x0];}else{var MName,MNumber,split=match[0x1][_0x2187f2(0x1b6)]('/');MNumber=split[0x1],MName=split[0x0];}function _0x240b(){var _0x1bf940=['jid','6477972QnRibn','client','702118yDWQqL','contact','data','12724956TsNzFQ','9sesJfK','includes','5vMGilJ','TEL;type=CELL;type=VOICE;waid=','split','7675458dIpiVH','text','BEGIN:VCARD\x0a','sendMessage','FN:','131096abctyP','VERSION:3.0\x0a','replace','9161368tcsrvG','2904844ZsbQlq'];_0x240b=function(){return _0x1bf940;};return _0x240b();}await message[_0x2187f2(0x1c3)][_0x2187f2(0x1ba)](message['jid'],vc_proc,MessageType['text'],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message[_0x2187f2(0x1c6)]});const vcard=_0x2187f2(0x1b9)+_0x2187f2(0x1bd)+(_0x2187f2(0x1bb)+MName+'\x0a')+'ORG:Powered\x20by\x20WhatsAlexa;\x0a'+(_0x2187f2(0x1cb)+MNumber+':+'+MNumber+'\x0a')+'END:VCARD';await message[_0x2187f2(0x1c3)][_0x2187f2(0x1ba)](message[_0x2187f2(0x1c1)],{'displayname':MName,'vcard':vcard},MessageType[_0x2187f2(0x1c5)],{'contextInfo':{'forwardingScore':0x31,'isForwarded':!![]},'quoted':message['data']});

}))
