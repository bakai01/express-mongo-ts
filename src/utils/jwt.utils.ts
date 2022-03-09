import jwt from 'jsonwebtoken';

import config from 'config';

export const sign  = (object: Object, options?: jwt.SignOptions | undefined) => {
  const privateKey = config.get('privateKey') as string;

  return jwt.sign(object, privateKey, options);
};
