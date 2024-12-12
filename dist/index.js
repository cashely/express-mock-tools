"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _main = _interopRequireDefault(require("./main.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
console.log(process.env.NODE_ENV, '----process.env');
_dotenv["default"].config({
  path: ['.env', ".env.".concat(process.env.NODE_ENV)]
});
setTimeout(function () {
  console.log(process.env.POSTGRESQL_URL, '----process.env.POSTGRESQL_URL');
}, 2000);
var app = (0, _main["default"])();
var _default = exports["default"] = app;