"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ = _interopRequireDefault(require("."));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var service = new _["default"]();

/**
 * @name 查找全部
 */
service.find = service.findAll = service.models.Request.findAll.bind(service.models.Request);

/**
 * @name 创建
 * @param {Object} request
 */
service.create = service.models.Request.create.bind(service.models.Request);
var _default = exports["default"] = service;