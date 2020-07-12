"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionUser = void 0;

var _celebrate = require("celebrate");

const sessionUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  })
});
exports.sessionUser = sessionUser;