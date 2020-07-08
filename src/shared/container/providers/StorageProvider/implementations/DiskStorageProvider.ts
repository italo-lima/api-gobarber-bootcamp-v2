import fs from 'fs';
import path from 'path';

import configUpload from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    //movendo arquivo da pasta tmp para tmp/uploads
    await fs.promises.rename(
      path.resolve(configUpload.tmpFolder, file),
      path.resolve(configUpload.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(configUpload.uploadsFolder, file);

    try {
      // verificando se encontrou o arquivo
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // caso tenha encontrado
    await fs.promises.unlink(filePath);
  }
}
