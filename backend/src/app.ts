import cors from 'cors';
import express, { Express, Request, Response } from 'express';

import { errorHandler } from './error';
import { tasksRouter } from './routes/tasks';
import { AppState } from './state';

export function buildApp(state: AppState): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/tasks', tasksRouter(state));

  app.use(errorHandler);

  return app;
}
