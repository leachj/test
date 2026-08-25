import cors from "cors";
import express, { type Express } from "express";

import { errorHandler } from "./error.js";
import { tasksRouter } from "./routes/tasks.js";
import { AppState } from "./state.js";

export function buildApp(state: AppState = new AppState()): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/tasks", tasksRouter(state));

  app.use(errorHandler);

  return app;
}
