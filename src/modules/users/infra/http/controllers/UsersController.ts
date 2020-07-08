import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const userService = container.resolve(CreateUserService);

    const user = await userService.execute({ name, email, password });

    return res.json(classToClass(user));
  }
}
