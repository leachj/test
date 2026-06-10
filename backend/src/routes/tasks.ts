import { Router, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task';

export const router = Router();

// In-memory store
const tasks: Map<string, Task> = new Map();

// GET /tasks
router.get('/', (_req: Request, res: Response) => {
  res.json(Array.from(tasks.values()));
});

// GET /tasks/:id
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    const err = new Error('Task not found') as Error & { statusCode: number };
    err.statusCode = 404;
    return next(err);
  }
  res.json(task);
});

// POST /tasks
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as CreateTaskDto;
  if (!body.title || body.title.trim() === '') {
    const err = new Error('Title is required') as Error & { statusCode: number };
    err.statusCode = 400;
    return next(err);
  }

  const task: Task = {
    id: uuidv4(),
    title: body.title.trim(),
    description: body.description?.trim() ?? '',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.set(task.id, task);
  res.status(200).json(task);
});

// PATCH /tasks/:id
router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    const err = new Error('Task not found') as Error & { statusCode: number };
    err.statusCode = 404;
    return next(err);
  }

  const body = req.body as UpdateTaskDto;
  const updated: Task = {
    ...task,
    title: body.title?.trim() ?? task.title,
    description: body.description?.trim() ?? task.description,
    completed: body.completed ?? task.completed,
  };

  tasks.set(updated.id, updated);
  res.json(updated);
});

// DELETE /tasks/:id
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  if (!tasks.has(req.params.id)) {
    const err = new Error('Task not found') as Error & { statusCode: number };
    err.statusCode = 404;
    return next(err);
  }
  tasks.delete(req.params.id);
  res.status(204).send();
});

export function clearTasks(): void {
  tasks.clear();
}
