let config = require('./config');
let Commands = [];

function newCommand(info, func) {

    let types = ['photo', 'image', 'text', 'message'];

    var infos = {
        private: info['private'] === undefined ? false : info['private'],
        group: info['group'] === undefined ? false : info['group'],
        pinned: info['pinned'] === undefined ? false : info['pinned'],
        category: info['category'] === undefined ? false : info['category'],
        pm: info['pm'] === undefined ? false : info['pm'],
        deleteCommand: info['deleteCommand'] === undefined ? true : info['deleteCommand'],
        desc: info['desc'] === undefined ? '' : info['desc'],
        usage: info['usage'] === undefined ? '' : info['usage'],
        hideFromCommandList: info['hideFromCommandList'] === undefined ? false : info['hideFromCommandList'],
        warn: info['warn'] === undefined ? '' : info['warn'],
        function: func
    };

    if (info['on'] === undefined && info['pattern'] === undefined) {
        infos.on = 'message';
        infos.fromMe = false;
    } else if (info['on'] !== undefined && types.includes(info['on'])) {
        infos.on = info['on'];

        if (info['pattern'] !== undefined) {
            infos.pattern = new RegExp((info['handler'] === undefined || info['handler'] === true ? config.HANDLERS : '') + info.pattern, (info['flags'] !== undefined ? info['flags'] : ''));
        }
    } else {
        infos.pattern = new RegExp((info['handler'] === undefined || info['handler'] === true ? config.HANDLERS : '') + info.pattern, (info['flags'] !== undefined ? info['flags'] : ''));
    }

    Commands.push(infos);
    return infos;
}

module.exports = {
    newCommand: newCommand,
    commands: Commands
}
