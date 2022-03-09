import { Session } from './session.model';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import config from 'config';
import { sign } from '../../utils/jwt.utils';

class Service {
  async create(userId: string, userAgent: string) {
    try {
      const session = await Session.create({ user: userId, userAgent });

      return session.toJSON();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async createAccessToken({ user, session }: CreateAccessTokenDto) {
    return sign(
      { ...user, session: session._id },
      { expiresIn: config.get('accessTokenTtl') }
    );
  }
}

export const SessionService = new Service;
