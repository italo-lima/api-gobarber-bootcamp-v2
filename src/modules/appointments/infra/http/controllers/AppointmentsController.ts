import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { date, provider_id } = req.body;
    const user_id = req.user.id;

    const createAppointment = container.resolve(CreateAppointmentService); // para injeção de dependência funcionar

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    return res.json(appointment);
  }
}
