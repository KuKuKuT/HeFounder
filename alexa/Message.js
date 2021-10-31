const _0x21f29a = _0x363c;
(function (_0x448f8b, _0x386de3) {
  const _0x8b50f4 = _0x363c,
    _0x221d6a = _0x448f8b();
  while (!![]) {
    try {
      const _0x1bc447 =
        (parseInt(_0x8b50f4(0xaf)) / 0x1) * (-parseInt(_0x8b50f4(0xc8)) / 0x2) +
        parseInt(_0x8b50f4(0xd4)) / 0x3 +
        (parseInt(_0x8b50f4(0xb7)) / 0x4) * (parseInt(_0x8b50f4(0xb2)) / 0x5) +
        (-parseInt(_0x8b50f4(0xb6)) / 0x6) *
          (-parseInt(_0x8b50f4(0xbf)) / 0x7) +
        parseInt(_0x8b50f4(0xab)) / 0x8 +
        (parseInt(_0x8b50f4(0xc0)) / 0x9) * (parseInt(_0x8b50f4(0xbd)) / 0xa) +
        (parseInt(_0x8b50f4(0xc2)) / 0xb) * (-parseInt(_0x8b50f4(0xb9)) / 0xc);
      if (_0x1bc447 === _0x386de3) break;
      else _0x221d6a["push"](_0x221d6a["shift"]());
    } catch (_0x58fbb8) {
      _0x221d6a["push"](_0x221d6a["shift"]());
    }
  }
})(_0x3cf4, 0x8874e);
const {
    MessageType,
    Presence,
    MessageOptions,
  } = require("@adiwajshing/baileys"),
  Base = require(_0x21f29a(0xc9)),
  ReplyMessage = require(_0x21f29a(0xc1));
function _0x363c(_0x12f052, _0x488854) {
  const _0x3cf4fc = _0x3cf4();
  return (
    (_0x363c = function (_0x363c03, _0x57a082) {
      _0x363c03 = _0x363c03 - 0xa9;
      let _0x3e21af = _0x3cf4fc[_0x363c03];
      return _0x3e21af;
    }),
    _0x363c(_0x12f052, _0x488854)
  );
}
class Message extends Base {
  constructor(_0x44f69d, _0x2d96b8) {
    super(_0x44f69d);
    if (_0x2d96b8) this["_patch"](_0x2d96b8);
  }
  [_0x21f29a(0xd9)](_0x4571c5) {
    const _0x22f01a = _0x21f29a;
    return (
      (this["id"] =
        _0x4571c5["key"]["id"] === undefined
          ? undefined
          : _0x4571c5[_0x22f01a(0xac)]["id"]),
      (this["jid"] = _0x4571c5["key"][_0x22f01a(0xd0)]),
      (this[_0x22f01a(0xcb)] = _0x4571c5[_0x22f01a(0xac)]["fromMe"]),
      (this["message"] =
        _0x4571c5[_0x22f01a(0xb0)]["extendedTextMessage"] === null
          ? _0x4571c5["message"][_0x22f01a(0xd7)]
          : _0x4571c5[_0x22f01a(0xb0)][_0x22f01a(0xca)][_0x22f01a(0xb3)]),
      (this["unreadCount"] = _0x4571c5[_0x22f01a(0xb5)]),
      (this["timestamp"] =
        typeof _0x4571c5[_0x22f01a(0xb4)] === _0x22f01a(0xd3)
          ? _0x4571c5["messageTimestamp"][_0x22f01a(0xce)]
          : _0x4571c5[_0x22f01a(0xb4)]),
      (this[_0x22f01a(0xba)] = _0x4571c5),
      _0x4571c5[_0x22f01a(0xb0)][_0x22f01a(0xc5)](_0x22f01a(0xca)) &&
      _0x4571c5[_0x22f01a(0xb0)][_0x22f01a(0xca)][_0x22f01a(0xc5)](
        _0x22f01a(0xb8)
      ) === !![] &&
      _0x4571c5["message"][_0x22f01a(0xca)]["contextInfo"][_0x22f01a(0xc5)](
        _0x22f01a(0xcc)
      )
        ? (this[_0x22f01a(0xd2)] = new ReplyMessage(
            this["client"],
            _0x4571c5[_0x22f01a(0xb0)][_0x22f01a(0xca)][_0x22f01a(0xb8)]
          ))
        : (this[_0x22f01a(0xd2)] = ![]),
      _0x4571c5[_0x22f01a(0xb0)]["hasOwnProperty"]("extendedTextMessage") &&
      _0x4571c5["message"][_0x22f01a(0xca)][_0x22f01a(0xc5)]("contextInfo") ===
        !![] &&
      _0x4571c5[_0x22f01a(0xb0)][_0x22f01a(0xca)][_0x22f01a(0xb8)][
        "hasOwnProperty"
      ](_0x22f01a(0xd8))
        ? (this["mention"] =
            _0x4571c5[_0x22f01a(0xb0)][_0x22f01a(0xca)]["contextInfo"][
              _0x22f01a(0xd8)
            ])
        : (this[_0x22f01a(0xbb)] = ![]),
      super[_0x22f01a(0xd9)](_0x4571c5)
    );
  }
  async [_0x21f29a(0xd1)]() {
    const _0x545d9a = _0x21f29a;
    return await this[_0x545d9a(0xb1)]["deleteMessage"](this["jid"], {
      id: this["id"],
      remoteJid: this[_0x545d9a(0xc3)],
      fromMe: !![],
    });
  }
  async [_0x21f29a(0xcf)](_0x339afb) {
    const _0x40a192 = _0x21f29a;
    var _0x4b8eb8 = await this[_0x40a192(0xb1)][_0x40a192(0xbc)](
      this[_0x40a192(0xc3)],
      _0x339afb,
      MessageType[_0x40a192(0xb3)],
      {
        contextInfo: { forwardingScore: 0x31, isForwarded: !![] },
        quoted: this[_0x40a192(0xba)],
      }
    );
    return new Message(this[_0x40a192(0xb1)], _0x4b8eb8);
  }
  async [_0x21f29a(0xbc)](_0x17164b, _0x1f47c1, _0x1849ac) {
    const _0x15a9a6 = _0x21f29a;
    return await this[_0x15a9a6(0xb1)][_0x15a9a6(0xbc)](
      this[_0x15a9a6(0xc3)],
      _0x17164b,
      _0x1f47c1,
      _0x1849ac
    );
  }
  async [_0x21f29a(0xcd)]() {
    const _0x3ac45d = _0x21f29a;
    return await this["client"][_0x3ac45d(0xa9)](this["jid"], _0x3ac45d(0xaa));
  }
  async ["sendTyping"]() {
    const _0x572171 = _0x21f29a;
    return await this["client"][_0x572171(0xad)](
      this[_0x572171(0xc3)],
      Presence[_0x572171(0xae)]
    );
  }
  async [_0x21f29a(0xc4)]() {
    const _0x40cedd = _0x21f29a;
    return await this[_0x40cedd(0xb1)]["updatePresence"](
      this["jid"],
      Presence["recording"]
    );
  }
  async [_0x21f29a(0xd6)]() {
    const _0x47f249 = _0x21f29a;
    return await this[_0x47f249(0xb1)]["updatePresence"](
      this[_0x47f249(0xc3)],
      Presence[_0x47f249(0xc7)]
    );
  }
  async ["sendOffline"]() {
    const _0x2aa1bf = _0x21f29a;
    return await this[_0x2aa1bf(0xb1)]["updatePresence"](
      this["jid"],
      Presence[_0x2aa1bf(0xd5)]
    );
  }
  async [_0x21f29a(0xbe)]() {
    const _0x172b0b = _0x21f29a;
    return await this["client"][_0x172b0b(0xa9)](this[_0x172b0b(0xc3)]);
  }
}
module[_0x21f29a(0xc6)] = Message;
function _0x3cf4() {
  const _0x2c2dac = [
    "jid",
    "sendRecording",
    "hasOwnProperty",
    "exports",
    "available",
    "8QmiAgi",
    "./Base",
    "extendedTextMessage",
    "fromMe",
    "quotedMessage",
    "sendUnread",
    "low",
    "sendReply",
    "remoteJid",
    "delete",
    "reply_message",
    "object",
    "374829TjrKDy",
    "unavailable",
    "sendOnline",
    "conversation",
    "mentionedJid",
    "_patch",
    "chatRead",
    "unread",
    "3442312qSWhrl",
    "key",
    "updatePresence",
    "composing",
    "117841uLECEp",
    "message",
    "client",
    "648775sfjToV",
    "text",
    "messageTimestamp",
    "unreadCount",
    "9078zkGBgc",
    "4nFmPzs",
    "contextInfo",
    "12ceyutl",
    "data",
    "mention",
    "sendMessage",
    "7835270TVbBhT",
    "sendRead",
    "217vjdyCG",
    "9PEBazW",
    "./ReplyMessage",
    "5336397iudsvH",
  ];
  _0x3cf4 = function () {
    return _0x2c2dac;
  };
  return _0x3cf4();
}
