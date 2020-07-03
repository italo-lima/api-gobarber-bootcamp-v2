import { Router, request } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import verifyAuthentication from '@modules/users/infra/http/middlewares/verifyAuthentication';
import fileUpload from '@config/upload';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });

  return res.json(user);
});

usersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  fileUpload.single('avatar'),
  async (req, res) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRoutes;
