"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _main = _interopRequireDefault(require("./main.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
console.log(process.env, '----process.env');
_dotenv["default"].config({
  path: ['.env', ".env.".concat(process.env.NODE_ENV)]
  //   path: '.env.local'
});
console.log(process.env, '--');
var app = (0, _main["default"])();
var _default = exports["default"] = app;