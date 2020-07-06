import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(verifyAuthentication);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
