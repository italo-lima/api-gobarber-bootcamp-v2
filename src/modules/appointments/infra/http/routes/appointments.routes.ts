import { Router } from 'express';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentController = new AppointmentController();

appointmentsRoutes.use(verifyAuthentication);

// appointmentsRoutes.get('/', async (req, res) => {

//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRoutes.post('/', appointmentController.create);

export default appointmentsRoutes;
