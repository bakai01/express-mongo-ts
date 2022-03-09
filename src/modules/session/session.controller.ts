import { Request, Response } from 'express';

import { log } from '../../logger';
import { UserService } from '../user/user.service';
import { SessionService } from './session.service';
import { sign } from '../../utils/jwt.utils';
import config from 'config';

class Controller {
  async createUserSession(req: Request, res: Response) {
    try {
      const user = await UserService.validatePassword(req.body);

      if (!user) {
        return res.status(401).send('Invalid email or password');
      }

      const session = await SessionService.create(user._id, req.get('user-agent') || '');

      const accessToken = await SessionService.createAccessToken({
        user,
        session,
      });

      const refreshToken = sign(session, { expiresIn: config.get('refreshTokenTtl') });

      return res.send({ accessToken, refreshToken });
    } catch (e: any) {
      log.error(e);
      return res.status(409).send(e.message);
    }
  }
}

export const SessionController = new Controller;
