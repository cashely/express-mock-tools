"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _db = _interopRequireDefault(require("../config/db"));
var _Project = _interopRequireDefault(require("./Project"));
var _Folder = _interopRequireDefault(require("./Folder"));
var _Schema = _interopRequireDefault(require("./Schema"));
var _User = _interopRequireDefault(require("./User"));
var _Schedule = _interopRequireDefault(require("./Schedule"));
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
var Document = /*#__PURE__*/function (_Sequelize$Model) {
  function Document() {
    _classCallCheck(this, Document);
    return _callSuper(this, Document, arguments);
  }
  _inherits(Document, _Sequelize$Model);
  return _createClass(Document);
}(_sequelize["default"].Model);
;
/**
 * @description 文档模型
 * @class Document
 */
Document.init({
  /**
   * @type {number}
   * @description 文档id
   */
  id: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  /**
   * @type {string}
   * @description 文档名称
   */
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  /**
   * @type {string}
   * @description 文档别名
   */
  alias: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  /**
   * @type {string}
   * @description 文档描述
   */
  description: {
    type: _sequelize.DataTypes.STRING,
    allowNull: true
  },
  /**
   * @type {number}
   * @description 文档创建者
   */
  creatorId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  /**
   * @type {number}
   * @description 文档最后一次修改者
   */
  latstCreator: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  /**
   * @type {string}
   * @description 文档路径
   */
  path: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  /**
   * @type {number}
   * @description 文档状态
   */
  statu: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 1 // 0 - 删除 1 - 正常
  },
  type: {
    type: _sequelize.DataTypes.INTEGER,
    defaultValue: 1 // 0 - schema、 1 - json、 2 - template
  },
  schemaId: {
    type: _sequelize.DataTypes.INTEGER,
    unique: true,
    allowNull: true
  },
  projectId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  /**
   * @name 请求的类型
   */
  method: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 'all' // 0 - all 1 - get 2 - post 3 - put 4 - delete
  },
  /**
   * @name 返回状态码
   */
  statuCode: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 200
  },
  /**
   * @name 协议
   */
  protocol: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1 // 1 - http 2 - websocket
  },
  /**
   * 定时调度任务id
   */
  scheduleId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  /**
   * @name 是否应用模版
   */
  useTemplate: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 2 // 1 - 是 2 - 否
  }
}, {
  sequelize: _db["default"],
  modelName: 'Document',
  tableName: 'documents',
  paranoid: true
});
_Project["default"].hasMany(Document, {
  foreignKey: 'projectId',
  sourceKey: 'id',
  as: 'documents',
  scope: {
    statu: 1
  }
});
Document.belongsTo(_Project["default"], {
  foreignKey: 'projectId',
  targetKey: 'id',
  as: 'project'
});
_Folder["default"].hasMany(Document, {
  foreignKey: 'folderId',
  sourceKey: 'id',
  as: 'documents'
});
Document.belongsTo(_Folder["default"], {
  foreignKey: 'folderId',
  targetKey: 'id',
  as: 'folder'
});
Document.belongsTo(_Schema["default"], {
  foreignKey: 'schemaId',
  sourceKey: 'id',
  as: 'schema'
});
Document.belongsTo(_User["default"], {
  foreignKey: 'creatorId',
  targetKey: 'id',
  as: 'creator'
});
Document.belongsTo(_Schedule["default"], {
  foreignKey: 'scheduleId',
  targetKey: 'id',
  as: 'schedule'
});
var _default = exports["default"] = Document;