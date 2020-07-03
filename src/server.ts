import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { tmpFolder } from './config/upload';

import './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', express.static(tmpFolder));

app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
