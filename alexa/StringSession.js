const _0x106eeb = _0xa2fa;
function _0xa2fa(_0x13819a, _0x40c76a) {
  const _0x137b41 = _0x137b();
  return (
    (_0xa2fa = function (_0xa2fa4c, _0x4ba503) {
      _0xa2fa4c = _0xa2fa4c - 0x69;
      let _0x567a34 = _0x137b41[_0xa2fa4c];
      return _0x567a34;
    }),
    _0xa2fa(_0x13819a, _0x40c76a)
  );
}
function _0x137b() {
  const _0x251ff3 = [
    "385850dqCeTL",
    "ALEXA_SESSION",
    "1407944fopInb",
    "137952uaODJf",
    "deCrypt",
    "STRING_SESSION",
    "===",
    "238VSjItk",
    "5Wcijyc",
    "89796PKPCmu",
    "utf-8",
    "createStringSession",
    "461493YmihYE",
    "exports",
    "stringify",
    "existsSync",
    "261450gCkvHE",
    "utf8",
    "length",
    "readFileSync",
    "toString",
    "2350076CeMfZN",
    "base64",
  ];
  _0x137b = function () {
    return _0x251ff3;
  };
  return _0x137b();
}
(function (_0x4a3402, _0x1bff7d) {
  const _0x3d3985 = _0xa2fa,
    _0x32bf9c = _0x4a3402();
  while (!![]) {
    try {
      const _0x1f4085 =
        parseInt(_0x3d3985(0x7d)) / 0x1 +
        parseInt(_0x3d3985(0x69)) / 0x2 +
        -parseInt(_0x3d3985(0x76)) / 0x3 +
        (-parseInt(_0x3d3985(0x7b)) / 0x4) *
          (-parseInt(_0x3d3985(0x6e)) / 0x5) +
        (parseInt(_0x3d3985(0x6f)) / 0x6) * (-parseInt(_0x3d3985(0x6d)) / 0x7) +
        -parseInt(_0x3d3985(0x7f)) / 0x8 +
        parseInt(_0x3d3985(0x72)) / 0x9;
      if (_0x1f4085 === _0x1bff7d) break;
      else _0x32bf9c["push"](_0x32bf9c["shift"]());
    } catch (_0x3eaf0b) {
      _0x32bf9c["push"](_0x32bf9c["shift"]());
    }
  }
})(_0x137b, 0x4e863);
const fs = require("fs");
class StringSession {
  constructor() {}
  [_0x106eeb(0x6a)](_0xa37207 = undefined) {
    const _0x26ec2d = _0x106eeb;
    if (_0x26ec2d(0x7e) in process["env"] && _0xa37207 === undefined)
      _0xa37207 = process["env"][_0x26ec2d(0x6b)];
    else
      _0xa37207 !== undefined &&
        fs[_0x26ec2d(0x75)](_0xa37207) &&
        (_0xa37207 = fs[_0x26ec2d(0x79)](_0xa37207, {
          encoding: _0x26ec2d(0x77),
          flag: "r",
        }));
    var _0x458704 = _0xa37207["split"](_0x26ec2d(0x6c));
    if (_0x458704[_0x26ec2d(0x78)] >= 0x2)
      return JSON["parse"](
        Buffer["from"](
          _0x458704[_0x458704[_0x26ec2d(0x78)] - 0x1],
          _0x26ec2d(0x7c)
        )[_0x26ec2d(0x7a)](_0x26ec2d(0x70))
      );
  }
  [_0x106eeb(0x71)](_0x520cff) {
    const _0xf067c = _0x106eeb;
    return (
      "Alexa===" +
      Buffer["from"](JSON[_0xf067c(0x74)](_0x520cff))[_0xf067c(0x7a)](
        _0xf067c(0x7c)
      )
    );
  }
}
module[_0x106eeb(0x73)] = StringSession;
