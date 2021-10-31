let WhatsAlexa = require('../events');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let Config = require('../config');
let axios = require('axios');
let request = require('request');
let got = require("got");
let Language = require('../language');
let Lang = Language.getString('ttp');

if (Config.WORKTYPE == 'private') {
    
    newCommand(
             {pattern: 'qr ?(.*)',
              private: true,
              desc: Lang.QR_DESC},
              (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_WORD, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});

        var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: '*Made By WhatsAlexa*', contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        
    }));
}
else if (Config.WORKTYPE == 'public') {
    
    newCommand(
             {pattern: 'qr ?(.*)',
              private: false,
              desc: Lang.QR_DESC},
              (async (message, match) => {

        if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_WORD, MessageType.text, {contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});

        var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

        await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.png, caption: '*Made By WhatsAlexa*', contextInfo: { forwardingScore: 49, isForwarded: true }, quoted: message.data});
        
    }));
}
