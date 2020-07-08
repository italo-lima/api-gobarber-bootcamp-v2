import multer, { StorageEngine } from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

interface IUploadStorage {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, cb) {
        const fileHash = randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return cb(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'bckt-gobarber',
    },
  },
} as IUploadStorage;
