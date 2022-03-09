import { Express, Request, Response } from 'express';

import { validateRequest } from './middleware/validateRequest';
import { UserController } from './modules/user/user.controller';
import { createUserSchema } from './modules/user/user.schema';

export const router = (app: Express) => {
  app.get('/health-check', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), UserController.createUser);
  // Login
  // Get users sessions
  // Logout
};
