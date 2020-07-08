import { Request, Response } from 'express';
import { container } from 'tsyringe';
//classToClass vai aplicar as regras de exclusão ou adicão de campos feito no model
import { classToClass } from 'class-transformer';

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

    return res.json({ user: classToClass(user), token });
  }
}
