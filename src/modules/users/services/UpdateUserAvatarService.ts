import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import { tmpFolder } from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // Excluindo avatar, caso já exista
    if (user.avatar) {
      //caminho da pasta folder + nome do arquivo do usuário no banco
      const userAvatarFilePath = path.join(tmpFolder, user.avatar);

      //retorna true ou false, caso arquivo exiat na pasta tmp
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        //deletando arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    // adicionado avatar ao usuário
    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
