"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import start from './main.js';

_dotenv["default"].config();
console.log(process.env.NODE_ENV);

// const app = start();

// export default app;