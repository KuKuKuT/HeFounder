const _0x2a7866 = _0x4f6e;
function _0x37a6() {
  const _0x2b5694 = [
    "./Message",
    "available",
    "client",
    "42FsoIlV",
    "10974650rUUYFy",
    "split",
    "composing",
    "sendReply",
    "48bmfmpn",
    "downloadAndSaveMediaMessage",
    "_patch",
    "videoMessage",
    "877gmUZDV",
    "mediaKey",
    "messageTimestamp",
    "72396dEzolp",
    "mimetype",
    "unavailable",
    "12XZtTJm",
    "fromMe",
    "sendMessage",
    "delete",
    "key",
    "@adiwajshing/baileys",
    "recording",
    "download",
    "2728uQqVyO",
    "57VXkgMp",
    "contextInfo",
    "message",
    "quotedMessage",
    "data",
    "remoteJid",
    "4171370GLfPnk",
    "reply_message",
    "updatePresence",
    "caption",
    "8311644VotGMw",
    "./Base",
    "width",
    "exports",
    "jid",
    "url",
    "sendTyping",
    "206245OuuMnv",
    "871434kQfKnc",
    "height",
    "./ReplyMessage",
  ];
  _0x37a6 = function () {
    return _0x2b5694;
  };
  return _0x37a6();
}
(function (_0x571be6, _0x26b792) {
  const _0x2da454 = _0x4f6e,
    _0x2f7ed9 = _0x571be6();
  while (!![]) {
    try {
      const _0x5e4284 =
        (-parseInt(_0x2da454(0xeb)) / 0x1) * (parseInt(_0x2da454(0xf9)) / 0x2) +
        (-parseInt(_0x2da454(0xfa)) / 0x3) * (parseInt(_0x2da454(0xee)) / 0x4) +
        (-parseInt(_0x2da454(0x10b)) / 0x5) *
          (-parseInt(_0x2da454(0x112)) / 0x6) +
        parseInt(_0x2da454(0x100)) / 0x7 +
        (parseInt(_0x2da454(0xe7)) / 0x8) *
          (-parseInt(_0x2da454(0x10c)) / 0x9) +
        parseInt(_0x2da454(0xe3)) / 0xa +
        (-parseInt(_0x2da454(0x104)) / 0xb) *
          (-parseInt(_0x2da454(0xf1)) / 0xc);
      if (_0x5e4284 === _0x26b792) break;
      else _0x2f7ed9["push"](_0x2f7ed9["shift"]());
    } catch (_0x4dbeb7) {
      _0x2f7ed9["push"](_0x2f7ed9["shift"]());
    }
  }
})(_0x37a6, 0x968d1);
function _0x4f6e(_0x3a4532, _0x31f4e5) {
  const _0x37a655 = _0x37a6();
  return (
    (_0x4f6e = function (_0x4f6e9a, _0x1b01dd) {
      _0x4f6e9a = _0x4f6e9a - 0xe3;
      let _0x47bc9f = _0x37a655[_0x4f6e9a];
      return _0x47bc9f;
    }),
    _0x4f6e(_0x3a4532, _0x31f4e5)
  );
}
const { MessageType, Presence, MessageOptions } = require(_0x2a7866(0xf6)),
  Base = require(_0x2a7866(0x105)),
  Message = require(_0x2a7866(0x10f)),
  ReplyMessage = require(_0x2a7866(0x10e));
class Video extends Base {
  constructor(_0x2a6d31, _0xe10507) {
    const _0x195e55 = _0x2a7866;
    super(_0x2a6d31);
    if (_0xe10507) this[_0x195e55(0xe9)](_0xe10507);
  }
  [_0x2a7866(0xe9)](_0x21b8be) {
    const _0x22de4f = _0x2a7866;
    return (
      (this["id"] =
        _0x21b8be["key"]["id"] === undefined
          ? undefined
          : _0x21b8be[_0x22de4f(0xf5)]["id"]),
      (this[_0x22de4f(0x108)] = _0x21b8be["key"][_0x22de4f(0xff)]),
      (this["fromMe"] = _0x21b8be[_0x22de4f(0xf5)][_0x22de4f(0xf2)]),
      (this[_0x22de4f(0x103)] =
        _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xea)][_0x22de4f(0x103)] === null
          ? _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xea)][_0x22de4f(0x103)]
          : ""),
      (this[_0x22de4f(0x109)] =
        _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xea)]["url"]),
      (this["timestamp"] =
        typeof _0x21b8be["messageTimestamp"] === "object"
          ? _0x21b8be[_0x22de4f(0xed)]["low"]
          : _0x21b8be[_0x22de4f(0xed)]),
      (this[_0x22de4f(0xef)] =
        _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xea)][_0x22de4f(0xef)]),
      (this["height"] =
        _0x21b8be[_0x22de4f(0xfc)]["videoMessage"][_0x22de4f(0x10d)]),
      (this[_0x22de4f(0x106)] =
        _0x21b8be["message"][_0x22de4f(0xea)][_0x22de4f(0x106)]),
      (this[_0x22de4f(0xec)] =
        _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xea)]["mediaKey"]),
      (this[_0x22de4f(0xfe)] = _0x21b8be),
      _0x21b8be["message"][_0x22de4f(0xea)]["hasOwnProperty"]("contextInfo") &&
      _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xfb)][_0x22de4f(0xfd)]
        ? (this["reply_message"] = new ReplyMessage(
            this[_0x22de4f(0x111)],
            _0x21b8be[_0x22de4f(0xfc)][_0x22de4f(0xea)]["contextInfo"]
          ))
        : (this[_0x22de4f(0x101)] = ![]),
      super[_0x22de4f(0xe9)](_0x21b8be)
    );
  }
  async [_0x2a7866(0xf4)]() {
    const _0x10ed85 = _0x2a7866;
    return await this[_0x10ed85(0x111)]["deleteMessage"](
      this[_0x10ed85(0x108)],
      { id: this["id"], remoteJid: this[_0x10ed85(0x108)], fromMe: !![] }
    );
  }
  async [_0x2a7866(0xe6)](_0xd58a03) {
    const _0x41cf8d = _0x2a7866;
    var _0x53147a = await this["client"][_0x41cf8d(0xf3)](
      this[_0x41cf8d(0x108)],
      _0xd58a03,
      MessageType["text"],
      {
        contextInfo: { forwardingScore: 0x31, isForwarded: !![] },
        quoted: this[_0x41cf8d(0xfe)],
      }
    );
    return new Message(this[_0x41cf8d(0x111)], _0x53147a);
  }
  async ["sendMessage"](_0x567a45, _0x2268e5, _0x2675e0) {
    const _0x1b396f = _0x2a7866;
    return await this[_0x1b396f(0x111)][_0x1b396f(0xf3)](
      this[_0x1b396f(0x108)],
      _0x567a45,
      _0x2268e5,
      _0x2675e0
    );
  }
  async [_0x2a7866(0x10a)]() {
    const _0x17b6bd = _0x2a7866;
    return await this[_0x17b6bd(0x111)][_0x17b6bd(0x102)](
      this[_0x17b6bd(0x108)],
      Presence[_0x17b6bd(0xe5)]
    );
  }
  async ["sendRecording"]() {
    const _0x1b7c19 = _0x2a7866;
    return await this[_0x1b7c19(0x111)][_0x1b7c19(0x102)](
      this[_0x1b7c19(0x108)],
      Presence[_0x1b7c19(0xf7)]
    );
  }
  async ["sendOnline"]() {
    const _0xb4ad2 = _0x2a7866;
    return await this["client"][_0xb4ad2(0x102)](
      this[_0xb4ad2(0x108)],
      Presence[_0xb4ad2(0x110)]
    );
  }
  async ["sendOffline"]() {
    const _0x3fd68d = _0x2a7866;
    return await this[_0x3fd68d(0x111)]["updatePresence"](
      this[_0x3fd68d(0x108)],
      Presence[_0x3fd68d(0xf0)]
    );
  }
  async [_0x2a7866(0xf8)](_0x54573d = this["id"]) {
    const _0x460769 = _0x2a7866;
    return (
      await this[_0x460769(0x111)][_0x460769(0xe8)](
        this[_0x460769(0xfe)],
        _0x54573d
      ),
      this["id"] + "." + this["mimetype"][_0x460769(0xe4)]("/")[0x1]
    );
  }
}
module[_0x2a7866(0x107)] = Video;
