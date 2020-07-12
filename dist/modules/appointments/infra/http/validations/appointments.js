"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppointment = void 0;

var _celebrate = require("celebrate");

const createAppointment = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date().required()
  })
});
exports.createAppointment = createAppointment;