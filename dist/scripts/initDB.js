"use strict";

require("dotenv/config");
var _index = _interopRequireDefault(require("../models/index"));
var _db = _interopRequireDefault(require("../config/db"));
var _createRelation = _interopRequireDefault(require("./createRelation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
Promise.all(Object.values(_index["default"]).map(function (model) {
  return model.sync({
    force: true
  });
})).then(function () {
  consoel.log('数据表全部创建完成, 开始创建关联关系');
  (0, _createRelation["default"])();
  return _db["default"].sync({
    alter: true
  });
}).then(function () {
  console.log('关联关系创建完成, 数据结构同步成功');
})["catch"](function (err) {
  console.log('同步失败', err);
});