"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _AvatarController = _interopRequireDefault(require("../controllers/AvatarController"));

var _verifyAuthentication = _interopRequireDefault(require("../middlewares/verifyAuthentication"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _multer = _interopRequireDefault(require("multer"));

var _users = require("../validations/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
const fileUpload = (0, _multer.default)(_upload.default.multer);
const usersController = new _UsersController.default();
const avatarController = new _AvatarController.default();
usersRoutes.post('/', _users.createUser, usersController.create);
usersRoutes.patch('/avatar', _verifyAuthentication.default, fileUpload.single('avatar'), avatarController.update);
var _default = usersRoutes;
exports.default = _default;