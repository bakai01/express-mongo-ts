import express from 'express';
import config from 'config';

import { log } from './logger';
import { connect } from './database/connect';
import { router } from './routes';
import { deserializeUser } from './middleware';

const PORT = config.get('PORT') as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
router(app);

const bootstrap = async () => {
  try {
    await connect();

    app.listen(PORT, () => log.info(`Server listening on port: ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
