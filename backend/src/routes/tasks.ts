import { Router } from "express";
import { randomUUID } from "node:crypto";

import { AppError } from "../error.js";
import type { CreateTaskDto, Task, UpdateTaskDto } from "../models.js";
import type { AppState } from "../state.js";

export function tasksRouter(state: AppState): Router {
  const router = Router();

  router.get("/", (_req, res) => {
    res.json(Array.from(state.tasks.values()));
  });

  router.get("/:id", (req, res, next) => {
    const task = state.tasks.get(req.params.id);
    if (!task) {
      return next(AppError.notFound("Task not found"));
    }
    res.json(task);
  });

  router.post("/", (req, res, next) => {
    const body = req.body as CreateTaskDto;
    const title = (body.title ?? "").trim();
    if (!title) {
      return next(AppError.badRequest("Title is required"));
    }

    const task: Task = {
      id: randomUUID(),
      title,
      description: (body.description ?? "").trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    state.tasks.set(task.id, task);
    res.status(201).json(task);
  });

  router.patch("/:id", (req, res, next) => {
    const existing = state.tasks.get(req.params.id);
    if (!existing) {
      return next(AppError.notFound("Task not found"));
    }

    const body = req.body as UpdateTaskDto;
    const updated: Task = {
      id: existing.id,
      title: body.title !== undefined ? body.title.trim() : existing.title,
      description:
        body.description !== undefined
          ? body.description.trim()
          : existing.description,
      completed: body.completed ?? existing.completed,
      createdAt: existing.createdAt,
    };

    state.tasks.set(updated.id, updated);
    res.json(updated);
  });

  router.delete("/:id", (req, res, next) => {
    if (!state.tasks.delete(req.params.id)) {
      return next(AppError.notFound("Task not found"));
    }
    res.status(204).end();
  });

  return router;
}
