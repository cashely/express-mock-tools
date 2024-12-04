"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _User = _interopRequireDefault(require("./User"));
var _db = _interopRequireDefault(require("../config/db"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /**
 * 定时任务
 */
var Schedule = /*#__PURE__*/function (_Sequelize$Model) {
  function Schedule() {
    _classCallCheck(this, Schedule);
    return _callSuper(this, Schedule, arguments);
  }
  _inherits(Schedule, _Sequelize$Model);
  return _createClass(Schedule);
}(_sequelize["default"].Model);
Schedule.init({
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  times: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    max: 20,
    min: 1,
    comment: '调用频次'
  },
  path: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    comment: '调用地址'
  },
  method: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 2,
    // 1 - get 2 - post 3 - put 4 - delete 5 - patch
    allowNull: false,
    comment: '调用方法'
  },
  gap: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2 * 1000,
    // 默认 2s 单位 ms
    comment: '间隔时间'
  },
  running: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 0,
    comment: '是否正在运行'
  },
  creatorId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    comment: '创建人Id'
  }
}, {
  sequelize: _db["default"],
  modelName: 'Schedule',
  tableName: 'schedules',
  freezeTableName: true,
  paranoid: true
});
var _default = exports["default"] = Schedule;