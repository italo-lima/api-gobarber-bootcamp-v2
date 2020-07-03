import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { tmpFolder } from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', express.static(tmpFolder));

app.use(routes);

//Global exception handler
// para funcionar, precisa instalar yarn add express-async-errors e chama após o express
app.use((err: Error, req: Request, resp: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return resp
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return resp.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
