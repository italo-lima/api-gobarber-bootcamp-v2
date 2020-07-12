"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(req, res) {
    const user_id = req.user.id;

    const userProfile = _tsyringe.container.resolve(_ShowProfileService.default);

    const user = await userProfile.execute({
      user_id
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

  async update(req, res) {
    const {
      name,
      email,
      password,
      old_password
    } = req.body;
    const user_id = req.user.id;

    const userService = _tsyringe.container.resolve(_UpdateProfileService.default);

    const user = await userService.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });
    return res.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = ProfileController;