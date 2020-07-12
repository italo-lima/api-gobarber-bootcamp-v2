"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProfile = void 0;

var _celebrate = require("celebrate");

const updateProfile = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    old_password: _celebrate.Joi.string(),
    password: _celebrate.Joi.string(),
    password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password'))
  })
});
exports.updateProfile = updateProfile;