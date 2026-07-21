import { Task } from './models.js';

/**
 * In-memory task store, mirroring a `Map<string, Task>`.
 */
export class AppState {
  public readonly tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map();
  }

  /** Clears all tasks. Used between test cases. */
  clearTasks(): void {
    this.tasks.clear();
  }
}
