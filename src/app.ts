import express from 'express';
import config from 'config';

import { log } from './logger';

const PORT = config.get('PORT') as number;
const HOST = config.get('HOST') as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const bootstrap = async () => {
  try {
    app.listen(PORT, HOST, () => log.info(`Server listening on port: ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
