package com.taskmanager.backend.service;

import com.taskmanager.backend.model.Task;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/**
 * In-memory task store, mirroring the {@code Map<string, Task>} used in the
 * original TypeScript/Rust implementations.
 */
@Service
public class TaskService {

    private final Map<String, Task> tasks = new ConcurrentHashMap<>();

    public Collection<Task> listTasks() {
        return tasks.values();
    }

    public Optional<Task> getTask(String id) {
        return Optional.ofNullable(tasks.get(id));
    }

    public Task createTask(String title, String description) {
        Task task = new Task(
                UUID.randomUUID().toString(),
                title,
                description,
                false,
                DateTimeFormatter.ISO_INSTANT.format(Instant.now()));
        tasks.put(task.getId(), task);
        return task;
    }

    public Optional<Task> updateTask(String id, String title, String description, Boolean completed) {
        Task existing = tasks.get(id);
        if (existing == null) {
            return Optional.empty();
        }
        Task updated = existing.withUpdates(title, description, completed);
        tasks.put(id, updated);
        return Optional.of(updated);
    }

    public boolean deleteTask(String id) {
        return tasks.remove(id) != null;
    }

    /** Clears all tasks. Used between test cases, matching {@code clearTasks()}. */
    public void clearTasks() {
        tasks.clear();
    }
}
