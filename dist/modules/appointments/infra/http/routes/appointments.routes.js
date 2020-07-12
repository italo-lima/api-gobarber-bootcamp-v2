"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _verifyAuthentication = _interopRequireDefault(require("../../../../users/infra/http/middlewares/verifyAuthentication"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

var _appointments = require("../validations/appointments");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentsRoutes = (0, _express.Router)();
const appointmentController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentsRoutes.use(_verifyAuthentication.default);
appointmentsRoutes.post('/', _appointments.createAppointment, appointmentController.create);
appointmentsRoutes.get('/me', providerAppointmentsController.index);
var _default = appointmentsRoutes;
exports.default = _default;