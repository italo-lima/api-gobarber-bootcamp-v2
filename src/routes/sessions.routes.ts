import { Router } from 'express';

import AuthenticatedUserService from '../services/AuthenticatedUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticatedUserService = new AuthenticatedUserService();

    const { user, token } = await authenticatedUserService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

export default sessionsRoutes;
