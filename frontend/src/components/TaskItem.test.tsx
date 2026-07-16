import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from '../components/TaskItem';
import type { Task } from '../api/tasks';

const sampleTask: Task = {
  id: '1',
  title: 'Test task',
  description: 'A description',
  completed: false,
  assignee: null,
  createdAt: new Date().toISOString(),
};

describe('TaskItem', () => {
  it('renders task title and description', () => {
    render(<TaskItem task={sampleTask} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('renders checkbox unchecked for incomplete task', () => {
    render(<TaskItem task={sampleTask} onToggle={vi.fn()} onDelete={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox checked for completed task', () => {
    render(<TaskItem task={{ ...sampleTask, completed: true }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onToggle when checkbox changes', () => {
    const onToggle = vi.fn();
    render(<TaskItem task={sampleTask} onToggle={onToggle} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('1', true);
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = vi.fn();
    render(<TaskItem task={sampleTask} onToggle={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByLabelText(/delete/i));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('renders existing assignee in the assignee input', () => {
    render(
      <TaskItem task={{ ...sampleTask, assignee: 'octocat' }} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    expect(screen.getByLabelText(/assignee/i)).toHaveValue('octocat');
  });

  it('renders empty assignee input when unassigned', () => {
    render(<TaskItem task={sampleTask} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByLabelText(/assignee/i)).toHaveValue('');
  });

  it('calls onAssign with trimmed value when assignee input loses focus', () => {
    const onAssign = vi.fn();
    render(<TaskItem task={sampleTask} onToggle={vi.fn()} onDelete={vi.fn()} onAssign={onAssign} />);
    const input = screen.getByLabelText(/assignee/i);
    fireEvent.change(input, { target: { value: '  octocat  ' } });
    fireEvent.blur(input);
    expect(onAssign).toHaveBeenCalledWith('1', 'octocat');
  });

  it('calls onAssign with null when assignee input is cleared', () => {
    const onAssign = vi.fn();
    render(
      <TaskItem
        task={{ ...sampleTask, assignee: 'octocat' }}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onAssign={onAssign}
      />
    );
    const input = screen.getByLabelText(/assignee/i);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(onAssign).toHaveBeenCalledWith('1', null);
  });
});
