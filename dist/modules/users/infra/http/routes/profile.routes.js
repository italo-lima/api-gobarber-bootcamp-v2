"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

var _verifyAuthentication = _interopRequireDefault(require("../middlewares/verifyAuthentication"));

var _profile = require("../validations/profile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRoutes = (0, _express.Router)();
const profileController = new _ProfileController.default();
profileRoutes.use(_verifyAuthentication.default);
profileRoutes.get('/', profileController.show);
profileRoutes.put('/', _profile.updateProfile, profileController.update);
var _default = profileRoutes;
exports.default = _default;