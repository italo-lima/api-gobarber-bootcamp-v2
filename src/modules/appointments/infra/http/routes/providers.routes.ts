import { Router } from 'express';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRoutes = Router();
const providersController = new ProvidersController();

providersRoutes.use(verifyAuthentication);

providersRoutes.get('/', providersController.index);

export default providersRoutes;
