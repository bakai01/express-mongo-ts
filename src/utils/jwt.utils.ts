import jwt from 'jsonwebtoken';

import config from 'config';

export const sign  = (object: Object, options?: jwt.SignOptions | undefined) => {
  const privateKey = config.get('privateKey') as string;

  return jwt.sign(object, privateKey, options);
};

export const decode = (token: string) => {
  try {
    const privateKey = config.get('privateKey') as string;
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
