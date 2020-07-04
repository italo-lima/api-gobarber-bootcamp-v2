import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticatedUserService = container.resolve(
      AuthenticatedUserService,
    );

    const { user, token } = await authenticatedUserService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
