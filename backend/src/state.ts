import type { Task } from "./models.js";

/** In-memory task store, keyed by task id. */
export class AppState {
  tasks: Map<string, Task> = new Map();

  /** Clears all tasks. Used between test cases. */
  clearTasks(): void {
    this.tasks.clear();
  }
}
