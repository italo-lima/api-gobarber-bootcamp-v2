//Raw executa query pura, sem as tratativas do ORM
import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInMonthProvider({
    provider_id,
    month,
    year,
  }: IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    // padStar preenche um segundo digíto com 0, caso tenha apenas 1 casa o número
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // dateFieldName representa o campo date dentro da base (no orm adiciona prefixos)
        date: Raw(
          dateFieldName =>
            //to_char converte qualquer coisa para string
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}

export default AppointmentRepository;
