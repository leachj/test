import express from 'express';
import cors from 'cors';
import { router as tasksRouter } from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', tasksRouter);

app.use(errorHandler);
