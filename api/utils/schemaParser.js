"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _lodash = require("lodash");
var _mockjs = require("mockjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @name 切割对象key
 * @param {*} rule 
 * @param {*} times 
 * @returns 
 */

function splitKey(key) {
  var keyResult = key.split('|');
  var times = keyResult[1] || '1';
  var splitTimes = times.split('-');
  if (splitTimes.length > 1) {
    times = _mockjs.Random.integer(Math.min(splitTimes[0], splitTimes[1]), Math.max(splitTimes[0], splitTimes[1]));
  }
  return {
    keyName: keyResult[0],
    times: times
  };
}
function dd(times, callback) {
  if (+times === 1) {
    return callback;
  }
  return Array.from({
    length: times
  }).map(function () {
    return callback;
  });
}
function loopSchemaNode(jsonSchema) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  // 数组处理
  if ((0, _lodash.isPlainObject)(jsonSchema)) {
    return dd(times, (0, _lodash.keys)(jsonSchema).reduce(function (obj, key) {
      // 拆分key
      var _splitKey = splitKey(key),
        keyName = _splitKey.keyName,
        times = _splitKey.times;
      obj[keyName] = loopSchemaNode(jsonSchema[key], times);
      return obj;
    }, {}));
    // 单节点处理
  } else if ((0, _lodash.isArray)(jsonSchema)) {
    return [loopSchemaNode(jsonSchema[0])];
  } else {
    return dd(times, jsonSchema);
  }
}
function mockData(struct) {
  return Object.keys(struct).reduce(function (obj, key) {
    return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, mockField(struct[key])));
  }, {});
}
function mockField(field) {
  if ((0, _lodash.isArray)(field)) {
    return field.map(function (fieldItem) {
      return mockField(fieldItem);
    });
  }
  if ((0, _lodash.isPlainObject)(field)) {
    return mockData(field);
  }
  return mockJsField(field);
}
function mockJsField(field) {
  switch (true) {
    case /^@/.test(field):
      // return mock(field.replace('#', '@'));
      return (0, _mockjs.mock)(field);
    default:
      return field;
  }
}
function schemaParser(schema) {
  var schemaStruct = loopSchemaNode(schema);
  if ((0, _lodash.isArray)(schemaStruct)) {
    return [mockData(schemaStruct[0])];
  }
  return mockData(schemaStruct);
}
var _default = exports["default"] = schemaParser;