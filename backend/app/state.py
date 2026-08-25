"""In-memory task store, keyed by task id."""

from __future__ import annotations

from app.models import Task


class AppState:
    def __init__(self) -> None:
        self.tasks: dict[str, Task] = {}

    def clear_tasks(self) -> None:
        """Clears all tasks. Used between test cases."""
        self.tasks.clear()
