import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

import { sessionUser } from '@modules/users/infra/http/validations/sessions';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post('/', sessionUser, sessionsController.create);

export default sessionsRoutes;
