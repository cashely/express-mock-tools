"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
function Response(req, res) {
  this.res = res;
}
Response.prototype.success = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  this.res.status(200).json({
    code: 200,
    message: 'success',
    data: data
  });
};
Response.prototype.error = function (code, message) {
  this.res.json({
    code: code,
    message: message
  });
};
Response.prototype.noLogin = function () {
  this.res.status(401).json({
    code: 401,
    message: 'no login'
  });
};
function _default(req, res, next) {
  res.response = new Response(req, res);
  req.uuid = 1;
  next();
}