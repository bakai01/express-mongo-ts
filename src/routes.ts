import { Express, Request, Response } from 'express';

import { validateRequest } from './middleware/validate-request';
import { UserController } from './modules/user/user.controller';
import { createUserSchema } from './modules/user/user.schema';
import { createUserSessionSchema } from './modules/session/session.schema';
import { SessionController } from './modules/session/session.controller';

export const router = (app: Express) => {
  app.get('/health-check', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post('/api/users', validateRequest(createUserSchema), UserController.createUser);

  // Login
  app.post('/api/sessions', validateRequest(createUserSessionSchema), SessionController.createUserSession);

  // Get users sessions
  // Logout
};
