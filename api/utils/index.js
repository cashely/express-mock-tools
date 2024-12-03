"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTempFile = createTempFile;
exports.signToken = signToken;
exports.verifyToken = verifyToken;
exports.writeFile = writeFile;
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _nanoid = require("nanoid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var TOKEN_SECRET = 'secret';

/**
 * @name 加密token
 */

function signToken(data) {
  return _jsonwebtoken["default"].sign({
    data: data,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
  }, TOKEN_SECRET);
}

/**
 * @name 解密token
 */

function verifyToken(token) {
  return _jsonwebtoken["default"].verify(token, TOKEN_SECRET);
}

/**
 * @name 创建临时文件
 */
function createTempFile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    ext: '.json'
  };
  try {
    var dir = _nodePath["default"].join(__dirname, './.temp');
    if (_nodeFs["default"].existsSync(dir)) {
      _nodeFs["default"].mkdirSync(dir);
    }
    var filePath = "".concat(dir, "/").concat((0, _nanoid.nanoid)()).concat(options.ext);
    _nodeFs["default"].writeFileSync(filePath, '');
    return filePath;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @name 写入文件到文件夹
 */
function writeFile(filePath, content, options) {
  _nodeFs["default"].writeFileSync(filePath, content, options);
  return null;
}