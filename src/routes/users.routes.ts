import { Router, response } from 'express';

import CreateUserService from '../services/CreateUserService';

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

export default usersRoutes;
