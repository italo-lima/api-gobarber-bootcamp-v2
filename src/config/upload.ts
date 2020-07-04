import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export const uploadsFolder = path.resolve(tmpFolder, 'uploads');

export default multer({
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, cb) {
      const fileHash = randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return cb(null, filename);
    },
  }),
});
