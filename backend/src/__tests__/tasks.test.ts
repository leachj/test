import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { buildApp } from '../app.js';
import { AppState } from '../state.js';

function appWithFreshState() {
  const state = new AppState();
  state.clearTasks();
  return buildApp(state);
}

describe('tasks API', () => {
  let app: ReturnType<typeof appWithFreshState>;

  beforeEach(() => {
    app = appWithFreshState();
  });

  it('health returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('get tasks returns empty array when no tasks exist', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('get tasks returns all tasks', async () => {
    await request(app).post('/api/tasks').send({ title: 'Task 1' });
    await request(app).post('/api/tasks').send({ title: 'Task 2' });

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('post tasks creates a task with title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'My Task', description: 'Some description' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('My Task');
    expect(res.body.description).toBe('Some description');
    expect(res.body.completed).toBe(false);
    expect(typeof res.body.id).toBe('string');
    expect(typeof res.body.createdAt).toBe('string');
  });

  it('post tasks returns 400 when title is missing', async () => {
    const res = await request(app).post('/api/tasks').send({ description: 'no title' });
    expect(res.status).toBe(400);
  });

  it('post tasks returns 400 when title is empty', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(res.status).toBe(400);
  });

  it('get task by id returns task', async () => {
    const create = await request(app).post('/api/tasks').send({ title: 'Find me' });
    const id = create.body.id as string;

    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Find me');
  });

  it('get task by id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/tasks/nonexistent');
    expect(res.status).toBe(404);
  });

  it('patch task updates fields', async () => {
    const create = await request(app).post('/api/tasks').send({ title: 'Original' });
    const id = create.body.id as string;

    const res = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ title: 'Updated', completed: true });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.completed).toBe(true);
  });

  it('patch task returns 404 for unknown id', async () => {
    const res = await request(app).patch('/api/tasks/nonexistent').send({ title: 'x' });
    expect(res.status).toBe(404);
  });

  it('delete task deletes a task', async () => {
    const create = await request(app).post('/api/tasks').send({ title: 'Delete me' });
    const id = create.body.id as string;

    const del = await request(app).delete(`/api/tasks/${id}`);
    expect(del.status).toBe(204);

    const get = await request(app).get(`/api/tasks/${id}`);
    expect(get.status).toBe(404);
  });

  it('delete task returns 404 for unknown id', async () => {
    const res = await request(app).delete('/api/tasks/nonexistent');
    expect(res.status).toBe(404);
  });
});
