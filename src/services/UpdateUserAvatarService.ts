import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import { tmpFolder } from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw Error('Only authenticated users can change avatar');
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

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
