"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _db = _interopRequireDefault(require("../config/db"));
var _sequelize = _interopRequireWildcard(require("sequelize"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Reference = /*#__PURE__*/function (_Sequelize$Model) {
  function Reference() {
    _classCallCheck(this, Reference);
    return _callSuper(this, Reference, arguments);
  }
  _inherits(Reference, _Sequelize$Model);
  return _createClass(Reference);
}(_sequelize["default"].Model);
;
/**
 * @description 引用模型
 * @class Document
 */
Reference.init({
  /**
   * @type {number}
   * @description 引用片段id
   */
  id: {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  /**
   * @type {string}
   * @description 引用片段名称
   */
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  /**
   * @type {string}
   * @description 引用片段别名
   */
  alias: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  /**
   * @type {string}
   * @description 引用片段描述
   */
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  /**
   * @type {number}
   * @description 引用片段创建者
   */
  creator: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  /**
   * @type {number}
   * @description 引用片段最后一次修改者
   */
  latstCreator: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  /**
   * @type {string}
   * @description 引用片段内容
   */
  content: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  /**
   * @type {number}
   * @description 引用片段状态 1: 正常 0: 禁用
   */
  statu: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 1 // 1: 正常 0: 禁用
  }
}, {
  sequelize: _db["default"],
  modelName: 'Reference',
  tableName: 'references',
  freezeTableName: true,
  paranoid: true
});
var _default = exports["default"] = Reference;