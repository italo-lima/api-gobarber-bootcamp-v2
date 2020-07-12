"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers/HashProvider");

require("./providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UserRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Arquivo que controla a injeção de dependências
// Adicionando injeção do hashProvider
// registra a passagem desse repositório ao chamar a key AppointmentRepository
_tsyringe.container.registerSingleton('AppointmentRepository', _AppointmentsRepository.default);

_tsyringe.container.registerSingleton('UserRepository', _UserRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);