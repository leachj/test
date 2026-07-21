import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { AppError } from '../error';
import { CreateTaskDto, Task, UpdateTaskDto } from '../models';
import { AppState } from '../state';

export function tasksRouter(state: AppState): Router {
  const router = Router();

  router.get('/', (_req: Request, res: Response) => {
    res.json(Array.from(state.tasks.values()));
  });

  router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as CreateTaskDto;
      const title = (body.title ?? '').trim();
      if (title.length === 0) {
        throw AppError.badRequest('Title is required');
      }

      const task: Task = {
        id: uuidv4(),
        title,
        description: (body.description ?? '').trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };

      state.tasks.set(task.id, task);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    const task = state.tasks.get(req.params.id);
    if (!task) {
      next(AppError.notFound('Task not found'));
      return;
    }
    res.json(task);
  });

  router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
    const existing = state.tasks.get(req.params.id);
    if (!existing) {
      next(AppError.notFound('Task not found'));
      return;
    }

    const body = req.body as UpdateTaskDto;
    const updated: Task = {
      id: existing.id,
      title: body.title !== undefined ? body.title.trim() : existing.title,
      description: body.description !== undefined ? body.description.trim() : existing.description,
      completed: body.completed !== undefined ? body.completed : existing.completed,
      createdAt: existing.createdAt,
    };

    state.tasks.set(updated.id, updated);
    res.json(updated);
  });

  router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    if (!state.tasks.delete(req.params.id)) {
      next(AppError.notFound('Task not found'));
      return;
    }
    res.status(204).send();
  });

  return router;
}
