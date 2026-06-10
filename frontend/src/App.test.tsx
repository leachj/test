import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as tasksApi from '../api/tasks';

vi.mock('../api/tasks', () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.mocked(tasksApi.fetchTasks).mockResolvedValue([]);
  });

  it('renders the app header', async () => {
    render(<App />);
    expect(screen.getByText(/task manager/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
  });

  it('shows empty state when no tasks', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    });
  });

  it('renders tasks returned by the API', async () => {
    vi.mocked(tasksApi.fetchTasks).mockResolvedValue([
      { id: '1', title: 'My Task', description: '', completed: false, createdAt: '' },
    ]);

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('My Task')).toBeInTheDocument();
    });
  });
});
