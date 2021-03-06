import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import configUpload from '@config/upload';
import multer from 'multer';

import { createUser } from '@modules/users/infra/http/validations/users';

const usersRoutes = Router();

const fileUpload = multer(configUpload.multer);

const usersController = new UsersController();
const avatarController = new AvatarController();

usersRoutes.post('/', createUser, usersController.create);

usersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  fileUpload.single('avatar'),
  avatarController.update,
);

export default usersRoutes;
