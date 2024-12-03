"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fastDiff = _interopRequireDefault(require("fast-diff"));
var _route = _interopRequireDefault(require("../utils/route"));
var _document = _interopRequireDefault(require("../services/document"));
var _documentLog = _interopRequireDefault(require("../services/documentLog"));
var _schema = _interopRequireDefault(require("../services/schema"));
var _request = _interopRequireDefault(require("../services/request"));
var _transaction = _interopRequireDefault(require("../utils/transaction"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var router = new _route["default"]({
  auth: true
});
router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var projectId, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          projectId = req.query.projectId;
          _context.prev = 1;
          _context.next = 4;
          return _document["default"].findAll({
            where: {
              projectId: projectId
            }
          });
        case 4:
          result = _context.sent;
          res.response.success(result);
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.response.error(500, '查询文档失败');
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('/count', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var projectId, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          projectId = req.query.projectId;
          _context2.prev = 1;
          _context2.next = 4;
          return _document["default"].models.Document.count({
            where: {
              projectId: projectId
            }
          });
        case 4:
          result = _context2.sent;
          res.response.success(result);
          _context2.next = 12;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.response.error(500, '统计文档数量失败');
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).get('/:id', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return _document["default"].findOne({
            where: {
              id: id
            }
          });
        case 4:
          result = _context3.sent;
          res.response.success(result);
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.response.error(500, '查询文档失败');
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).post('/', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _transaction["default"].start(/*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(t) {
              var _req$body, projectId, name, content, path, folderId, description, type, useTemplate, protocal, scheduleId, user, schemaResult, result;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _req$body = req.body, projectId = _req$body.projectId, name = _req$body.name, content = _req$body.content, path = _req$body.path, folderId = _req$body.folderId, description = _req$body.description, type = _req$body.type, useTemplate = _req$body.useTemplate, protocal = _req$body.protocal, scheduleId = _req$body.scheduleId;
                    user = req.user;
                    _context4.next = 4;
                    return _schema["default"].create({
                      name: name,
                      content: content
                    }, {
                      transaction: t
                    });
                  case 4:
                    schemaResult = _context4.sent;
                    _context4.next = 7;
                    return _document["default"].create({
                      projectId: projectId,
                      folderId: folderId,
                      name: name,
                      schemaId: schemaResult.id,
                      creatorId: user.id,
                      path: path,
                      description: description,
                      type: type,
                      useTemplate: useTemplate,
                      scheduleId: scheduleId,
                      protocal: protocal
                    }, {
                      transaction: t
                    });
                  case 7:
                    result = _context4.sent;
                    _context4.next = 10;
                    return _documentLog["default"].create({
                      documentId: result.id,
                      operatorId: user.id,
                      content: content,
                      type: 1,
                      time: Date.now()
                    }, {
                      transaction: t
                    });
                  case 10:
                    res.response.success(result);
                  case 11:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x9) {
              return _ref5.apply(this, arguments);
            };
          }(), res);
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).put('/:id', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, user, _req$body2, content, name, description, type, schemaId, path, useTemplate, protocal, scheduleId;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _req$body2 = req.body, content = _req$body2.content, name = _req$body2.name, description = _req$body2.description, type = _req$body2.type, schemaId = _req$body2.schemaId, path = _req$body2.path, useTemplate = _req$body2.useTemplate, protocal = _req$body2.protocal, scheduleId = _req$body2.scheduleId;
          _transaction["default"].start(/*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(t) {
              var documentResult, isDiffContent, result;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return _document["default"].findOne({
                      where: {
                        id: id
                      }
                    });
                  case 2:
                    documentResult = _context6.sent;
                    if (!(documentResult.creatorId !== user.id)) {
                      _context6.next = 5;
                      break;
                    }
                    return _context6.abrupt("return", res.response.error(403, '该文档不是您创建的，无法修改'));
                  case 5:
                    isDiffContent = (0, _fastDiff["default"])(content, documentResult.schema.content);
                    if (!(isDiffContent.length > 1)) {
                      _context6.next = 11;
                      break;
                    }
                    _context6.next = 9;
                    return _schema["default"].updateOneById(schemaId, {
                      content: content
                    }, {
                      transaction: t
                    });
                  case 9:
                    _context6.next = 11;
                    return _documentLog["default"].create({
                      documentId: id,
                      operatorId: user.id,
                      content: content,
                      type: 0,
                      time: Date.now()
                    }, {
                      transaction: t
                    });
                  case 11:
                    _context6.next = 13;
                    return _document["default"].updateOneById(id, {
                      name: name,
                      description: description,
                      type: type,
                      path: path,
                      useTemplate: useTemplate,
                      protocal: protocal,
                      scheduleId: scheduleId
                    }, {
                      transaction: t
                    });
                  case 13:
                    result = _context6.sent;
                    res.response.success(result);
                  case 15:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x12) {
              return _ref7.apply(this, arguments);
            };
          }(), res);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}())["delete"]('/:id', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, user, documentResult, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context8.prev = 2;
          _context8.next = 5;
          return _document["default"].findOne({
            where: {
              id: id
            }
          });
        case 5:
          documentResult = _context8.sent;
          if (!(documentResult.creatorId !== user.id)) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.response.error(403, '该文档不是您创建的，无法删除'));
        case 8:
          _context8.next = 10;
          return _document["default"].deleteOneById(id);
        case 10:
          result = _context8.sent;
          _context8.next = 13;
          return _documentLog["default"].create({
            documentId: id,
            operatorId: user.id,
            type: 2,
            time: Date.now()
          });
        case 13:
          res.response.success(result);
          _context8.next = 20;
          break;
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](2);
          console.error(_context8.t0);
          res.response.error(500, '删除文档失败');
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 16]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}()).get('/export/:id', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.prev = 1;
          _context9.next = 4;
          return _document["default"].findOne({
            where: {
              id: id
            }
          });
        case 4:
          result = _context9.sent;
          res.response.success({
            content: result.toJSON().schema.content
          });
          _context9.next = 12;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          console.error(_context9.t0);
          res.response.error(500, '查询文档失败');
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 8]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}())

// @name 获取文档mock的访问记录
.get('/request/:id', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var id, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          _context10.prev = 1;
          _context10.next = 4;
          return _request["default"].findAll({
            where: {
              documentId: id
            }
          });
        case 4:
          result = _context10.sent;
          res.response.success(result);
          _context10.next = 12;
          break;
        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](1);
          console.log(_context10.t0);
          res.response.error(500, _context10.t0);
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[1, 8]]);
  }));
  return function (_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}())
// 从swagger批量导入
.post('/import/swagger', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _transaction["default"].start(/*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(t) {
              var user, _req$body3, projectId, documents, filterNullContent, nullContent, schemaEntitys, schemaResults, documentEntitys, documentResults;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    user = req.user;
                    _req$body3 = req.body, projectId = _req$body3.projectId, documents = _req$body3.documents;
                    filterNullContent = documents.filter(function (item) {
                      return item.content;
                    });
                    nullContent = documents.filter(function (item) {
                      return !item.content;
                    });
                    schemaEntitys = filterNullContent.map(function (item) {
                      return {
                        name: "".concat(item.path, "_").concat(item.method),
                        content: item.content
                      };
                    });
                    _context11.next = 7;
                    return _schema["default"].bulkCreate(schemaEntitys, {
                      transaction: t
                    });
                  case 7:
                    schemaResults = _context11.sent;
                    // 把空的内容跟非空的内容聚合成新的文档实体
                    documentEntitys = [].concat(_toConsumableArray(nullContent.map(function (item) {
                      return {
                        name: "".concat(item.path),
                        path: item.path,
                        method: function () {
                          switch (item.method) {
                            case 'get':
                              return 1;
                            case 'post':
                              return 2;
                            case 'put':
                              return 3;
                            case 'delete':
                              return 4;
                            default:
                              return 0;
                          }
                        }(),
                        description: item.description,
                        type: 0,
                        projectId: projectId,
                        creatorId: user.id
                      };
                    })), _toConsumableArray(schemaResults.map(function (item, index) {
                      return {
                        name: "".concat(filterNullContent[index].path),
                        path: filterNullContent[index].path,
                        method: filterNullContent[index].method,
                        description: filterNullContent[index].description,
                        type: 0,
                        projectId: projectId,
                        creatorId: user.id,
                        schemaId: item.id
                      };
                    }))); // 批量创建文档
                    _context11.next = 11;
                    return _document["default"].bulkCreate(documentEntitys, {
                      transaction: t
                    });
                  case 11:
                    documentResults = _context11.sent;
                    res.response.success(documentResults);
                  case 13:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            return function (_x21) {
              return _ref12.apply(this, arguments);
            };
          }(), res);
        case 1:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}());
var _default = exports["default"] = router;