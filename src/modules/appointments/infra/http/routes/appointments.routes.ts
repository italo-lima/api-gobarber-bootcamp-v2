import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';

const appointmentsRoutes = Router();

appointmentsRoutes.use(verifyAuthentication);

appointmentsRoutes.get('/', async (req, res) => {
  console.log(req.user);
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

appointmentsRoutes.post('/', async (req, res) => {
  const { date, provider_id } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRoutes;