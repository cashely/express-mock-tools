"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _project = _interopRequireDefault(require("./project"));
var _document = _interopRequireDefault(require("./document"));
var _folder = _interopRequireDefault(require("./folder"));
var _schema = _interopRequireDefault(require("./schema"));
var _mock = _interopRequireDefault(require("./mock"));
var _user = _interopRequireWildcard(require("./user"));
var _documentLog = _interopRequireDefault(require("./documentLog"));
var _upload = _interopRequireDefault(require("./upload"));
var _schedule = _interopRequireDefault(require("./schedule"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = function _default(app) {
  app.use('/mock', _mock["default"]);
  app.use('/project', _project["default"]);
  app.use('/document', _document["default"]);
  app.use('/schema', _schema["default"]);
  app.use('/folder', _folder["default"]);
  app.use('/user', _user["default"]);
  app.use('/login', _user.loginRouter);
  app.use('/signUp', _user.signUpRouter);
  app.use('/logs', _documentLog["default"]);
  app.use('/upload', _upload["default"]);
  app.use('/schedule', _schedule["default"]);
};