"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Raw executa query pura, sem as tratativas do ORM
class AppointmentRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date
      }
    });
    return findAppointment;
  }

  async create({
    user_id,
    provider_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  async findAllInMonthProvider({
    provider_id,
    month,
    year
  }) {
    // padStar preenche um segundo digíto com 0, caso tenha apenas 1 casa o número
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // dateFieldName representa o campo date dentro da base (no orm adiciona prefixos)
        date: (0, _typeorm.Raw)(dateFieldName => //to_char converte qualquer coisa para string
        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayProvider({
    provider_id,
    day,
    month,
    year
  }) {
    // padStar preenche um segundo digíto com 0, caso tenha apenas 1 casa o número
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // dateFieldName representa o campo date dentro da base (no orm adiciona prefixos)
        date: (0, _typeorm.Raw)(dateFieldName => //to_char converte qualquer coisa para string
        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

}

var _default = AppointmentRepository;
exports.default = _default;