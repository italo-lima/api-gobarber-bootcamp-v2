"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = void 0;

var _celebrate = require("celebrate");

const createUser = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: _celebrate.Joi.object({
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  })
});
exports.createUser = createUser;