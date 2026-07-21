use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

use crate::models::Task;

/// In-memory task store, mirroring the `Map<string, Task>` used in the
/// original TypeScript implementation.
#[derive(Clone, Default)]
pub struct AppState {
    pub tasks: Arc<Mutex<HashMap<String, Task>>>,
}

impl AppState {
    pub fn new() -> Self {
        Self::default()
    }

    /// Clears all tasks. Used between test cases, matching `clearTasks()`
    /// from the TypeScript router.
    pub fn clear_tasks(&self) {
        self.tasks.lock().unwrap().clear();
    }
}
