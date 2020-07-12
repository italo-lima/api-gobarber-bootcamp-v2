"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPassword = exports.resetPassword = void 0;

var _celebrate = require("celebrate");

const resetPassword = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    token: _celebrate.Joi.string().uuid().required(),
    password: _celebrate.Joi.string().required(),
    password_confirmation: _celebrate.Joi.string().required().valid(_celebrate.Joi.ref('password'))
  })
});
exports.resetPassword = resetPassword;
const forgotPassword = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    email: _celebrate.Joi.string().email().required()
  })
});
exports.forgotPassword = forgotPassword;