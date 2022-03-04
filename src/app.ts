import express from 'express';
import config from 'config';

import { log } from './logger';
import { connect } from './database/connect';
import { router } from './routes';

const PORT = config.get('PORT') as number;
const HOST = config.get('HOST') as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

const bootstrap = async () => {
  try {
    await connect();

    app.listen(PORT, HOST, () => log.info(`Server listening on port: ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
