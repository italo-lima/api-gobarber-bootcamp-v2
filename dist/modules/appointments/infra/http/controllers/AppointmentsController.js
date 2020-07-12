"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(req, res) {
    const {
      date,
      provider_id
    } = req.body;
    const user_id = req.user.id;

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default); // para injeção de dependência funcionar


    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date
    });
    return res.json(appointment);
  }

}

exports.default = AppointmentsController;