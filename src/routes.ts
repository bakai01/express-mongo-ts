import { Express, Request, Response } from 'express';

export const router = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  // Login
  // Get users sessions
  // Logout
};
