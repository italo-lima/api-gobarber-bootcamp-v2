"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SessionsController = _interopRequireDefault(require("../controllers/SessionsController"));

var _sessions = require("../validations/sessions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRoutes = (0, _express.Router)();
const sessionsController = new _SessionsController.default();
sessionsRoutes.post('/', _sessions.sessionUser, sessionsController.create);
var _default = sessionsRoutes;
exports.default = _default;