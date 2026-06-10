import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskForm } from '../components/TaskForm';

describe('TaskForm', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockReset();
  });

  it('renders title and description inputs', () => {
    render(<TaskForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  it('shows error when submitted with empty title', async () => {
    render(<TaskForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/title is required/i);
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with title and clears form', async () => {
    mockSubmit.mockResolvedValue(undefined);
    render(<TaskForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Buy milk' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Whole milk' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ title: 'Buy milk', description: 'Whole milk' });
    });

    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
  });

  it('shows error message when onSubmit throws', async () => {
    mockSubmit.mockRejectedValue(new Error('network error'));
    render(<TaskForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Task' } });
    fireEvent.click(screen.getByRole('button', { name: /add task/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/failed to add task/i);
  });
});
