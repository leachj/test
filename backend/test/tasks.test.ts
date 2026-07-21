import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { buildApp } from '../src/app.js';
import { AppState } from '../src/state.js';

function appWithFreshState() {
  const state = new AppState();
  state.clearTasks();
  return buildApp(state);
}

describe('health', () => {
  it('returns ok status', async () => {
    const app = appWithFreshState();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/tasks', () => {
  it('returns empty array when no tasks exist', async () => {
    const app = appWithFreshState();
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all tasks', async () => {
    const app = appWithFreshState();
    await request(app).post('/api/tasks').send({ title: 'Task 1' });
    await request(app).post('/api/tasks').send({ title: 'Task 2' });

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('POST /api/tasks', () => {
  it('creates a task with title', async () => {
    const app = appWithFreshState();
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

  it('returns 400 when title is missing', async () => {
    const app = appWithFreshState();
    const res = await request(app).post('/api/tasks').send({ description: 'no title' });
    expect(res.status).toBe(400);
  });

  it('returns 400 when title is empty', async () => {
    const app = appWithFreshState();
    const res = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns task by id', async () => {
    const app = appWithFreshState();
    const create = await request(app).post('/api/tasks').send({ title: 'Find me' });
    const id = create.body.id;

    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Find me');
  });

  it('returns 404 for unknown id', async () => {
    const app = appWithFreshState();
    const res = await request(app).get('/api/tasks/nonexistent');
    expect(res.status).toBe(404);
  });
});

describe('PATCH /api/tasks/:id', () => {
  it('updates fields', async () => {
    const app = appWithFreshState();
    const create = await request(app).post('/api/tasks').send({ title: 'Original' });
    const id = create.body.id;

    const res = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ title: 'Updated', completed: true });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.completed).toBe(true);
  });

  it('returns 404 for unknown id', async () => {
    const app = appWithFreshState();
    const res = await request(app).patch('/api/tasks/nonexistent').send({ title: 'x' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('deletes a task', async () => {
    const app = appWithFreshState();
    const create = await request(app).post('/api/tasks').send({ title: 'Delete me' });
    const id = create.body.id;

    const del = await request(app).delete(`/api/tasks/${id}`);
    expect(del.status).toBe(204);

    const get = await request(app).get(`/api/tasks/${id}`);
    expect(get.status).toBe(404);
  });

  it('returns 404 for unknown id', async () => {
    const app = appWithFreshState();
    const res = await request(app).delete('/api/tasks/nonexistent');
    expect(res.status).toBe(404);
  });
});
