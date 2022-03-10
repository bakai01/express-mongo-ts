import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';

import { Session, SessionDocument } from './session.model';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import config from 'config';
import { sign, decode } from '../../utils/jwt.utils';
import { UserService } from '../user/user.service';

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

  async reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    // Decode the refresh token
    const {decoded} = decode(refreshToken);

    if (!decoded || !get(decoded, '_id')) return false;

    // Get the session
    const session = await Session.findById(get(decoded, '_id'));

    // Make sure the session is still valid
    if (!session || !session?.valid) return false;

    const user = await UserService.find({ _id: session.user });

    if (!user) return false;

    return this.createAccessToken({ user, session });
  }

  async updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return Session.updateOne(query, update);
  }

  async getUserSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean();
  }

  async getAll() {
    return Session.find();
  }
}

export const SessionService = new Service;
