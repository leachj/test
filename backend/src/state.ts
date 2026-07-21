import { Task } from './models';

/**
 * In-memory task store, mirroring the `Map<string, Task>` used in the
 * original TypeScript implementation (and the Arc<Mutex<HashMap>> used in
 * the Rust rewrite).
 */
export class AppState {
  tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map();
  }

  /** Clears all tasks. Used between test cases. */
  clearTasks(): void {
    this.tasks.clear();
  }
}
