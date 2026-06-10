import { useTasks } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

export function TaskList() {
  const { tasks, loading, error, addTask, toggleTask, removeTask } = useTasks();

  return (
    <div>
      <TaskForm onSubmit={addTask} />
      {loading && <p>Loading tasks…</p>}
      {error && <p role="alert" style={{ color: '#e53e3e' }}>{error}</p>}
      {!loading && !error && tasks.length === 0 && (
        <p style={{ color: '#888', textAlign: 'center' }}>No tasks yet. Add one above!</p>
      )}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={removeTask} />
        ))}
      </ul>
    </div>
  );
}
