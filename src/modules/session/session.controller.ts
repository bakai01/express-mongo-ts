import { Request, Response } from 'express';
import { get } from 'lodash';

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

  async invalidateUserSession(req: Request, res: Response) {
    try {
      const sessionId = get(req, 'user.session');

      await SessionService.updateSession({ _id: sessionId }, { valid: false });

      return res.status(200).send('work');
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  }

  async getUserSessions(req: Request, res: Response) {
    const userId = get(req, 'user._id');

    const sessions = await SessionService.getUserSessions({ user: userId, valid: true });

    return res.send(sessions);
  }
}

export const SessionController = new Controller;
