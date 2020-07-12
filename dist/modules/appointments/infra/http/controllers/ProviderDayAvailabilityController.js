"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAvailabilityController {
  async index(req, res) {
    const {
      day,
      month,
      year
    } = req.body;
    const {
      provider_id
    } = req.params;

    const listProvidersDayAvailability = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year
    });
    return res.json(availability);
  }

}

exports.default = ProviderDayAvailabilityController;