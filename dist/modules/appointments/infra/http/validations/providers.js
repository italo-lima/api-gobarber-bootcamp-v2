"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.providerAvailability = void 0;

var _celebrate = require("celebrate");

const providerAvailability = (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: _celebrate.Joi.object({
    provider_id: _celebrate.Joi.string().uuid().required()
  })
});
exports.providerAvailability = providerAvailability;