import { DocumentDefinition } from 'mongoose';

import { User, UserDocument } from './user.model';

class Service {
  async create(input: DocumentDefinition<UserDocument>) {
    try {
      return await User.create(input);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async find() {

  }
}

export const UserService = new Service;
