"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _verifyAuthentication = _interopRequireDefault(require("../../../../users/infra/http/middlewares/verifyAuthentication"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvailabilityController"));

var _ProviderDayAvailabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvailabilityController"));

var _providers = require("../validations/providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersRoutes = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providerMonthAvailabilityController = new _ProviderMonthAvailabilityController.default();
const providerDayAvailabilityController = new _ProviderDayAvailabilityController.default();
providersRoutes.use(_verifyAuthentication.default);
providersRoutes.get('/', providersController.index);
providersRoutes.get('/:provider_id/day-availability', _providers.providerAvailability, providerDayAvailabilityController.index);
providersRoutes.get('/:provider_id/month-availability', _providers.providerAvailability, providerMonthAvailabilityController.index);
var _default = providersRoutes;
exports.default = _default;