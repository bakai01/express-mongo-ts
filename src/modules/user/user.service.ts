import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';

import { User, UserDocument } from './user.model';

class Service {
  async create(input: DocumentDefinition<UserDocument>) {
    try {
      return await User.create(input);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async find(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
  }

  async validatePassword({ email, password }: { email: UserDocument['email']; password: string; }) {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return false;
    }

    return omit(user.toJSON(), 'password');
  }
}

export const UserService = new Service;
