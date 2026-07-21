import { Router, type Request, type Response, type NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

import { AppError } from '../error.js';
import type { CreateTaskDto, Task, UpdateTaskDto } from '../models.js';
import type { AppState } from '../state.js';

export function tasksRouter(state: AppState): Router {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    res.json(Array.from(state.tasks.values()));
  });

  router.post(
    '/',
    (req: Request<unknown, unknown, CreateTaskDto>, res: Response, next: NextFunction) => {
      try {
        const title = (req.body.title ?? '').trim();
        if (title.length === 0) {
          throw AppError.badRequest('Title is required');
        }

        const task: Task = {
          id: randomUUID(),
          title,
          description: (req.body.description ?? '').trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        };

        state.tasks.set(task.id, task);
        res.status(201).json(task);
      } catch (err) {
        next(err);
      }
    },
  );

  router.get('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const task = state.tasks.get(req.params.id);
    if (!task) {
      next(AppError.notFound('Task not found'));
      return;
    }
    res.json(task);
  });

  router.patch(
    '/:id',
    (req: Request<{ id: string }, unknown, UpdateTaskDto>, res: Response, next: NextFunction) => {
      const existing = state.tasks.get(req.params.id);
      if (!existing) {
        next(AppError.notFound('Task not found'));
        return;
      }

      const updated: Task = {
        id: existing.id,
        title: req.body.title !== undefined ? req.body.title.trim() : existing.title,
        description:
          req.body.description !== undefined ? req.body.description.trim() : existing.description,
        completed: req.body.completed ?? existing.completed,
        createdAt: existing.createdAt,
      };

      state.tasks.set(updated.id, updated);
      res.json(updated);
    },
  );

  router.delete('/:id', (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    if (!state.tasks.delete(req.params.id)) {
      next(AppError.notFound('Task not found'));
      return;
    }
    res.status(204).end();
  });

  return router;
}
