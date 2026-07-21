import cors from 'cors';
import express, { type Express, type NextFunction, type Request, type Response } from 'express';

import { AppError } from './error.js';
import { tasksRouter } from './routes/tasks.js';
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
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: { message: 'Not found', statusCode: 404 } });
  });

  // Central error handler, mirrors the Rust `IntoResponse` impl for `AppError`.
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json(err.toJSON());
      return;
    }

    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: { message: 'Internal server error', statusCode: 500 } });
  });

  return app;
}
