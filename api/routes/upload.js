"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _route = _interopRequireDefault(require("../utils/route"));
var _swaggerParser = _interopRequireDefault(require("../utils/swaggerParser"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = new _route["default"]({
  // auth: true
});
router.use((0, _multer["default"])().any()).post("/swagger", function (req, res) {
  try {
    var files = req.files;
    if (files.length === 0) {
      return res.response.error(400, "没有选择文件");
    }
    var file = files[0];
    var buffer = file.buffer;
    var json = JSON.parse(buffer.toString());
    var jsonSchema = (0, _swaggerParser["default"])(json);

    // console.log(jsonSchema)
    res.response.success(jsonSchema);
  } catch (error) {
    console.log(error, 'error');
  }
});
var _default = exports["default"] = router;