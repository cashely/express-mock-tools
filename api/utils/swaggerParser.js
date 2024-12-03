"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dForest = _interopRequireDefault(require("d-forest"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _lodash = require("lodash");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /**
 * @name 解析swagger文档字符串
 * @param {} swagger 
 */
function swaggerParser(swaggerSchema) {
  var paths = swaggerSchema.paths,
    components = swaggerSchema.components;
  // transformComponents(components);
  var documents = [];
  Object.entries(paths).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      path = _ref2[0],
      pathValue = _ref2[1];
    Object.entries(pathValue).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        method = _ref4[0],
        methodValue = _ref4[1];
      // console.log(method, path, methodValue)
      // 有可能这里会是一个数组引用
      var _getContentFromRespon = getContentFromResponses(methodValue.responses),
        _getContentFromRespon2 = _slicedToArray(_getContentFromRespon, 2),
        isArray = _getContentFromRespon2[0],
        refPath = _getContentFromRespon2[1];
      var content = (0, _lodash.get)(components, refParserToDot(refPath));

      // 遍历每一个节点替换$ref的引用
      _dForest["default"].forEachNode(content, function (node, e, p) {
        if (node['$ref']) {
          (0, _lodash.set)(content, p, (0, _lodash.get)(components, refParserToDot(node['$ref'])));
        }
      });
      content = transformComponents(content);
      content = contentToMock(content);
      var document = {
        path: path,
        method: method,
        description: methodValue.description,
        content: isArray ? JSON.stringify([transformComponents(content)], null, '\t') : JSON.stringify(transformComponents(content), null, '\t')
      };
      documents.push(document);
    });
  });
  return documents;
}

/**
 * @name 解析ref字符串为点表示法
 * @param {*} refString 
 */
function refParserToDot(refString) {
  if (!refString) {
    return null;
  }
  return refString.replace('#/components/', '').split(_nodePath["default"].sep).join('.');
}

/**
 * @name 从responses中解析出content的schema的ref
 * @param {*} responses 
 * @returns 
 */
function getContentFromResponses(responses) {
  var responseKeys = Object.keys(responses);
  if (!(0, _lodash.find)(responseKeys, function (key) {
    return ['200', 'default'].includes(key);
  })) {
    return [];
  }
  if (responses['200'] && responses['200'].content['application/json']) {
    // console.log(get(responses, `200.content.application/json.schema.$ref`))
    // 如果顶层内容就是数组的情况
    if ((0, _lodash.get)(responses, "200.content.application/json.schema.type") === 'array') {
      return [1, (0, _lodash.get)(responses, "200.content.application/json.schema.items.$ref")];
    }
    return [0, (0, _lodash.get)(responses, "200.content.application/json.schema.$ref")];
  }
  if (responses['default'] && responses['default'].content) {
    // console.log(get(responses, `default.content.application/json.schema.$ref`))
    return [0, (0, _lodash.get)(responses, 'default.content.application/json.schema.$ref')];
  }
  return [];
}

/**
 * @name 将components中的$ref解析为对象
 * @param {*} components 
 * @returns 
 */
function transformComponents(components) {
  var _tempComponent = (0, _lodash.cloneDeep)(components);
  _dForest["default"].forEachNode(_tempComponent, function (node, e, p) {
    if (node['$ref']) {
      (0, _lodash.set)(_tempComponent, p, (0, _lodash.get)(_tempComponent, refParserToDot(node['$ref'])));
    }
    // 只取有效字段
    (0, _lodash.set)(_tempComponent, p, (0, _lodash.pick)(node, ['type', 'properties', 'example', 'items', 'enum', 'format', 'description']));
  });
  return _tempComponent;
}

/**
 * @name 将content中的字段转换为对象key:value的形式
 * @param {*} content 
 * @returns 
 */
function contentToMock(content) {
  if (!content) return null;
  return Object.keys(content.properties).reduce(function (obj, key) {
    var value = null;
    if (content.properties[key].properties) {
      value = contentToMock(content.properties[key]);
    } else {
      value = content.properties[key];
    }
    return _objectSpread(_objectSpread({}, obj), mockField(key, value));
  }, {});
}

/**
 * @name 将字段转换为mock字段
 * @param {string} key
 * @param {*} obj 
 * @returns 
 */
function mockField(key, obj) {
  if (obj.example) {
    return _defineProperty({}, key, obj.example);
  }
  switch (obj.type) {
    case 'integer':
      return _defineProperty({}, key, '@integer');
    case 'string':
      if (obj["enum"]) {
        return _defineProperty({}, key, "@pick(".concat(JSON.stringify(obj["enum"]), ")"));
      }
      return _defineProperty({}, key, '@string');
    case 'array':
      if (obj.items.type !== 'object') {
        return mockField("".concat(key, "|5"), obj.items);
      } else {
        return contentToMock(obj.items);
      }
    default:
      return null;
  }
}
var _default = exports["default"] = swaggerParser;