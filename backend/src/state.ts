import type { Task } from './models.js';

/**
 * In-memory task store, mirroring the `Map<string, Task>` used in the
 * original TypeScript implementation (and the `HashMap` in the Rust port).
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
