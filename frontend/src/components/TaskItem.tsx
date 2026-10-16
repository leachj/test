import { Task } from '../api/tasks';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

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
        {task.assignee && (
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#3182ce', wordBreak: 'break-word' }}>
            Assigned to: {task.assignee}
          </p>
        )}
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
