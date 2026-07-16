import { Task } from '../api/tasks';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onAssign?: (id: string, assignee: string | null) => void;
}

export function TaskItem({ task, onToggle, onDelete, onAssign }: TaskItemProps) {
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
        <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <label
            htmlFor={`assignee-${task.id}`}
            style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}
          >
            Assignee:
          </label>
          <input
            id={`assignee-${task.id}`}
            type="text"
            defaultValue={task.assignee ?? ''}
            aria-label={`Assignee for "${task.title}"`}
            placeholder="Unassigned"
            onBlur={(e) => onAssign?.(task.id, e.target.value.trim() || null)}
            style={{
              fontSize: '0.8rem',
              padding: '0.15rem 0.35rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              flex: 1,
              minWidth: 0,
            }}
          />
        </div>
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
