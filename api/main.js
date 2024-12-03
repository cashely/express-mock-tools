"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _expressWs = _interopRequireDefault(require("express-ws"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./routes"));
var _response = _interopRequireDefault(require("./middleware/response"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// import db from '../config/db';

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('tiny'));
app.use((0, _cors["default"])());
// app.use(express.static('public'))
// app.use(multer().fields([{ name: 'files[]' }]));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_response["default"]);
(0, _expressWs["default"])(app);
var port = 3000;
(0, _routes["default"])(app);
app.get('/', function (req, res) {
  res.response.success({
    message: 'Hello World!'
  });
});
function start() {
  app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
  });
  return app;
}
var _default = exports["default"] = start;