import { useState, useEffect, useCallback } from 'react';
import { Task, fetchTasks, createTask, updateTask, deleteTask, CreateTaskDto } from '../api/tasks';

export interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (data: CreateTaskDto) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const addTask = useCallback(async (data: CreateTaskDto) => {
    const task = await createTask(data);
    setTasks((prev) => [...prev, task]);
  }, []);

  const toggleTask = useCallback(async (id: string, completed: boolean) => {
    const updated = await updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  const removeTask = useCallback(async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, loading, error, addTask, toggleTask, removeTask };
}
