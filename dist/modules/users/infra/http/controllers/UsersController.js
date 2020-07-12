"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;

    const userService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await userService.execute({
      name,
      email,
      password
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;