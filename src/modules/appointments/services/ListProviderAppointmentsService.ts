import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('CacheProvider')
    private cacheRepository: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheRepository.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentRepository.findAllInDayProvider({
        provider_id,
        day,
        year,
        month,
      });

      await this.cacheRepository.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
//provider-appointment:d26b857a-cf9f-4fff-b34b-8cdd7d9f473d:2020-7-10
//provider-appointments:f1173ead-6775-4eda-821c-13259ce3efce:2020-7-10

//provider-appointment:d26b857a-cf9f-4fff-b34b-8cdd7d9f473d:2020-7-9
//provider-appointments:d26b857a-cf9f-4fff-b34b-8cdd7d9f473d:2020-7-9
