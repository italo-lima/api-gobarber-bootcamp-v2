import { Router, request } from 'express';

import CreateUserService from '../services/CreateUserService';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import fileUpload from '../config/upload';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userService = new CreateUserService();

    const user = await userService.execute({ name, email, password });

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

usersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  fileUpload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: req.user.id,
        avatarFileName: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  },
);

export default usersRoutes;
