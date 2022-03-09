import mongoose from 'mongoose';

import config from 'config';
import { log } from '../logger';

const connect = () => {
  const MONGODB_URI = config.get('MONGODB_URI') as string;

  return mongoose
    .connect(MONGODB_URI)
    .then(() => {
      log.info('Database connected');
    })
    .catch((error) => {
      log.error('db error', error);
      process.exit(1);
    });
};

export { connect };
