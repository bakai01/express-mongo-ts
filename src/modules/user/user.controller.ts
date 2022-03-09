import { Request, Response } from 'express';
import { omit } from 'lodash';

import { UserService } from './user.service';
import { log } from '../../logger';

class Controller {
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      return res.send(omit(user.toJSON(), "password"));
    } catch (e: any) {
      log.error(e);
      return res.status(409).send(e.message);
    }
  }
}

export const UserController = new Controller;
