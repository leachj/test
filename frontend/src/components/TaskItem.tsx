import { Task } from '../api/tasks';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  low: '#38a169',
  medium: '#dd6b20',
  high: '#e53e3e',
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.75rem',
        background: '#fff',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '0.5rem',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        style={{ marginTop: '2px' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#888' : '#111',
            wordBreak: 'break-word',
          }}
        >
          {task.title}
        </p>
        {task.description && (
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#555', wordBreak: 'break-word' }}>
            {task.description}
          </p>
        )}
        <span
          style={{
            display: 'inline-block',
            marginTop: '0.375rem',
            padding: '0.125rem 0.5rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'capitalize',
            color: '#fff',
            background: PRIORITY_COLORS[task.priority],
          }}
        >
          {task.priority}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.title}"`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#e53e3e',
          fontSize: '1rem',
          padding: '0 0.25rem',
        }}
      >
        ✕
      </button>
    </li>
  );
}
