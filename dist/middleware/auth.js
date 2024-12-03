"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = require("../utils");
function getTokenFromString(tokenString) {
  if (!tokenString) {
    return null;
  }
  return tokenString.split(' ')[1];
}
var _default = exports["default"] = function _default(req, res, next) {
  var token = req.query.token;
  var tokenStr = getTokenFromString(token);
  if (!tokenStr) {
    res.response.error(401, 'token 不存在');
    return;
  }
  try {
    var _verifyToken = (0, _utils.verifyToken)(tokenStr),
      data = _verifyToken.data;
    req.user = data;
  } catch (error) {
    res.response.error(401, 'token 无效');
    return;
  }

  // req.uuid = decoded.uuid;
  next();
};