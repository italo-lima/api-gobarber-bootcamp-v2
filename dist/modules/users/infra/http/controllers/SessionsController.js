"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticatedUserService = _interopRequireDefault(require("../../../services/AuthenticatedUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//classToClass vai aplicar as regras de exclusão ou adicão de campos feito no model
class SessionsController {
  async create(req, res) {
    const {
      email,
      password
    } = req.body;

    const authenticatedUserService = _tsyringe.container.resolve(_AuthenticatedUserService.default);

    const {
      user,
      token
    } = await authenticatedUserService.execute({
      email,
      password
    });
    return res.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = SessionsController;