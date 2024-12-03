"use strict";

var _index = _interopRequireDefault(require("../../models/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
Promise.all(Object.values(_index["default"]).map(function (model) {
  return model.sync({
    force: true
  });
})).then(function () {
  console.log('同步成功');
})["catch"](function (err) {
  console.log('同步失败', err);
});