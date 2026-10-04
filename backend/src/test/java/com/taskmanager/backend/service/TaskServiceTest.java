package com.taskmanager.backend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.taskmanager.backend.model.Task;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for {@link TaskService} in isolation from the HTTP layer,
 * exercising the in-memory store's create/read/update/delete semantics.
 */
class TaskServiceTest {

    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService = new TaskService();
    }

    @Test
    void listTasksIsEmptyInitially() {
        assertThat(taskService.listTasks()).isEmpty();
    }

    @Test
    void createTaskAssignsIdAndDefaults() {
        Task task = taskService.createTask("Title", "Description");

        assertThat(task.getId()).isNotBlank();
        assertThat(task.getTitle()).isEqualTo("Title");
        assertThat(task.getDescription()).isEqualTo("Description");
        assertThat(task.isCompleted()).isFalse();
        assertThat(task.getCreatedAt()).isNotBlank();
    }

    @Test
    void createTaskAssignsUniqueIdsForEachTask() {
        Task first = taskService.createTask("First", "");
        Task second = taskService.createTask("Second", "");

        assertThat(first.getId()).isNotEqualTo(second.getId());
    }

    @Test
    void createTaskAddsToTheStore() {
        Task task = taskService.createTask("Title", "");

        assertThat(taskService.listTasks()).hasSize(1);
        assertThat(taskService.getTask(task.getId())).contains(task);
    }

    @Test
    void listTasksReturnsAllCreatedTasks() {
        taskService.createTask("Task 1", "");
        taskService.createTask("Task 2", "");
        taskService.createTask("Task 3", "");

        assertThat(taskService.listTasks()).hasSize(3);
    }

    @Test
    void getTaskReturnsEmptyForUnknownId() {
        assertThat(taskService.getTask("does-not-exist")).isEmpty();
    }

    @Test
    void getTaskReturnsTheStoredTask() {
        Task task = taskService.createTask("Find me", "desc");

        assertThat(taskService.getTask(task.getId())).contains(task);
    }

    @Test
    void updateTaskReturnsEmptyForUnknownId() {
        Optional<Task> result = taskService.updateTask("does-not-exist", "New title", null, null);

        assertThat(result).isEmpty();
    }

    @Test
    void updateTaskAppliesOnlyProvidedFields() {
        Task original = taskService.createTask("Original title", "Original description");

        Optional<Task> updated = taskService.updateTask(original.getId(), "New title", null, null);

        assertThat(updated).isPresent();
        assertThat(updated.get().getTitle()).isEqualTo("New title");
        assertThat(updated.get().getDescription()).isEqualTo("Original description");
        assertThat(updated.get().isCompleted()).isFalse();
    }

    @Test
    void updateTaskCanToggleCompletedIndependently() {
        Task original = taskService.createTask("Title", "Description");

        Optional<Task> updated = taskService.updateTask(original.getId(), null, null, true);

        assertThat(updated).isPresent();
        assertThat(updated.get().getTitle()).isEqualTo("Title");
        assertThat(updated.get().getDescription()).isEqualTo("Description");
        assertThat(updated.get().isCompleted()).isTrue();
    }

    @Test
    void updateTaskPreservesIdAndCreatedAt() {
        Task original = taskService.createTask("Title", "Description");

        Optional<Task> updated = taskService.updateTask(original.getId(), "New title", "New desc", true);

        assertThat(updated).isPresent();
        assertThat(updated.get().getId()).isEqualTo(original.getId());
        assertThat(updated.get().getCreatedAt()).isEqualTo(original.getCreatedAt());
    }

    @Test
    void updateTaskPersistsChangesInTheStore() {
        Task original = taskService.createTask("Title", "Description");

        taskService.updateTask(original.getId(), "Updated", null, null);

        assertThat(taskService.getTask(original.getId())).map(Task::getTitle).contains("Updated");
    }

    @Test
    void deleteTaskReturnsFalseForUnknownId() {
        assertThat(taskService.deleteTask("does-not-exist")).isFalse();
    }

    @Test
    void deleteTaskRemovesAnExistingTaskAndReturnsTrue() {
        Task task = taskService.createTask("Delete me", "");

        assertThat(taskService.deleteTask(task.getId())).isTrue();
        assertThat(taskService.getTask(task.getId())).isEmpty();
        assertThat(taskService.listTasks()).isEmpty();
    }

    @Test
    void clearTasksRemovesEveryTask() {
        taskService.createTask("Task 1", "");
        taskService.createTask("Task 2", "");

        taskService.clearTasks();

        assertThat(taskService.listTasks()).isEmpty();
    }
}
