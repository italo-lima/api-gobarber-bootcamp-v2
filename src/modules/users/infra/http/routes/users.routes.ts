import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import fileUpload from '@config/upload';

const usersRoutes = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();

usersRoutes.post('/', usersController.create);

usersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  fileUpload.single('avatar'),
  avatarController.update,
);

export default usersRoutes;
