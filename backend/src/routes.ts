import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { AppError } from './error.js';
import { CreateTaskDto, Task, UpdateTaskDto } from './models.js';
import { AppState } from './state.js';

export function tasksRouter(state: AppState): Router {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    res.json(Array.from(state.tasks.values()));
  });

  router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const task = state.tasks.get(req.params.id);
    if (!task) {
      return next(AppError.notFound('Task not found'));
    }
    res.json(task);
  });

  router.post('/', (req: Request<unknown, unknown, CreateTaskDto>, res: Response, next: NextFunction) => {
    const title = (req.body.title ?? '').trim();
    if (!title) {
      return next(AppError.badRequest('Title is required'));
    }

    const task: Task = {
      id: uuidv4(),
      title,
      description: (req.body.description ?? '').trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    state.tasks.set(task.id, task);
    res.status(201).json(task);
  });

  router.patch('/:id', (req: Request<{ id: string }, unknown, UpdateTaskDto>, res: Response, next: NextFunction) => {
    const existing = state.tasks.get(req.params.id);
    if (!existing) {
      return next(AppError.notFound('Task not found'));
    }

    const updated: Task = {
      id: existing.id,
      title: req.body.title !== undefined ? req.body.title.trim() : existing.title,
      description: req.body.description !== undefined ? req.body.description.trim() : existing.description,
      completed: req.body.completed !== undefined ? req.body.completed : existing.completed,
      createdAt: existing.createdAt,
    };

    state.tasks.set(updated.id, updated);
    res.json(updated);
  });

  router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    if (!state.tasks.delete(req.params.id)) {
      return next(AppError.notFound('Task not found'));
    }
    res.status(204).end();
  });

  return router;
}
