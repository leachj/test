import request from 'supertest';
import { app } from '../src/app';
import { clearTasks } from '../src/routes/tasks';

beforeEach(() => {
  clearTasks();
});

describe('GET /health', () => {
  it('returns ok status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('Tasks API', () => {
  describe('GET /api/tasks', () => {
    it('returns empty array when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all tasks', async () => {
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });

      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('POST /api/tasks', () => {
    it('creates a task with title', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'My Task', description: 'Some description' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        title: 'My Task',
        description: 'Some description',
        completed: false,
      });
      expect(res.body.id).toBeDefined();
      expect(res.body.createdAt).toBeDefined();
    });

    it('returns 400 when title is missing', async () => {
      const res = await request(app).post('/api/tasks').send({ description: 'no title' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when title is empty', async () => {
      const res = await request(app).post('/api/tasks').send({ title: '   ' });
      expect(res.status).toBe(400);
    });

    it('creates a task with an assignee', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Assigned Task', assignee: 'Alice' });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ title: 'Assigned Task', assignee: 'Alice' });
    });

    it('omits assignee when not provided', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'No assignee' });
      expect(res.status).toBe(201);
      expect(res.body.assignee).toBeUndefined();
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('returns task by id', async () => {
      const create = await request(app).post('/api/tasks').send({ title: 'Find me' });
      const id = create.body.id as string;

      const res = await request(app).get(`/api/tasks/${id}`);
      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Find me');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/api/tasks/nonexistent');
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('updates task fields', async () => {
      const create = await request(app).post('/api/tasks').send({ title: 'Original' });
      const id = create.body.id as string;

      const res = await request(app)
        .patch(`/api/tasks/${id}`)
        .send({ title: 'Updated', completed: true });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ title: 'Updated', completed: true });
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).patch('/api/tasks/nonexistent').send({ title: 'x' });
      expect(res.status).toBe(404);
    });

    it('updates the assignee', async () => {
      const create = await request(app).post('/api/tasks').send({ title: 'Original' });
      const id = create.body.id as string;

      const res = await request(app)
        .patch(`/api/tasks/${id}`)
        .send({ assignee: 'Bob' });

      expect(res.status).toBe(200);
      expect(res.body.assignee).toBe('Bob');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes a task', async () => {
      const create = await request(app).post('/api/tasks').send({ title: 'Delete me' });
      const id = create.body.id as string;

      const del = await request(app).delete(`/api/tasks/${id}`);
      expect(del.status).toBe(204);

      const get = await request(app).get(`/api/tasks/${id}`);
      expect(get.status).toBe(404);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).delete('/api/tasks/nonexistent');
      expect(res.status).toBe(404);
    });
  });
});
