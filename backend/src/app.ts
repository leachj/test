import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';

import { AppError } from './error.js';
import { tasksRouter } from './routes.js';
import { AppState } from './state.js';

export function buildApp(state: AppState): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/tasks', tasksRouter(state));

  // 404 fallback for unmatched routes.
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(AppError.notFound('Not found'));
  });

  // Central error handler, mirroring `{ error: { message, statusCode } }`.
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        error: { message: err.message, statusCode: err.statusCode },
      });
      return;
    }

    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({
      error: { message: 'Internal server error', statusCode: 500 },
    });
  });

  return app;
}
