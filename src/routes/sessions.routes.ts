import { Router } from 'express';

import AuthenticatedUserService from '../services/AuthenticatedUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticatedUserService = new AuthenticatedUserService();

  const { user, token } = await authenticatedUserService.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRoutes;
