import { useState } from 'react';
import { CreateTaskDto } from '../api/tasks';
import { ASSIGNEES } from '../constants/assignees';

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => Promise<void>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        assignee: assignee || undefined,
      });
      setTitle('');
      setDescription('');
      setAssignee('');
    } catch {
      setError('Failed to add task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} style={{ marginBottom: '1.5rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <label htmlFor="task-title" style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>
          Title *
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <label htmlFor="task-desc" style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem' }}>
          Description
        </label>
        <input
          id="task-desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <label
          htmlFor="task-assignee"
          style={{ display: 'block', fontWeight: 600, marginBottom: '0.25rem', color: '#e53e3e' }}
        >
          Assignee
        </label>
        <div style={{ position: 'relative', maxWidth: '300px' }}>
          <select
            id="task-assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 2rem 0.6rem 1rem',
              borderRadius: '9999px',
              border: '3px solid #111',
              boxSizing: 'border-box',
              appearance: 'none',
              WebkitAppearance: 'none',
              color: '#e53e3e',
              fontWeight: 500,
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="">Unassigned</option>
            {ASSIGNEES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#111',
              fontSize: '0.75rem',
            }}
          >
            ▼
          </span>
        </div>
      </div>
      {error && <p role="alert" style={{ color: '#e53e3e', margin: '0 0 0.5rem' }}>{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        style={{ padding: '0.5rem 1rem', background: '#3182ce', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {submitting ? 'Adding…' : 'Add Task'}
      </button>
    </form>
  );
}
