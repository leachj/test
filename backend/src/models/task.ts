export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  assignee?: string;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  assignee?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
  assignee?: string;
}
