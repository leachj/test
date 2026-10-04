package com.taskmanager.backend.controller;

import com.taskmanager.backend.dto.CreateTaskRequest;
import com.taskmanager.backend.dto.UpdateTaskRequest;
import com.taskmanager.backend.exception.AppException;
import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.service.TaskService;
import java.util.Collection;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Collection<Task> listTasks() {
        return taskService.listTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable String id) {
        return taskService.getTask(id).orElseThrow(() -> AppException.notFound("Task not found"));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody CreateTaskRequest body) {
        String title = body.getTitle() == null ? "" : body.getTitle();
        String trimmedTitle = title.trim();
        if (trimmedTitle.isEmpty()) {
            throw AppException.badRequest("Title is required");
        }

        String description = body.getDescription() == null ? "" : body.getDescription().trim();
        Task task = taskService.createTask(trimmedTitle, description);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PatchMapping("/{id}")
    public Task updateTask(@PathVariable String id, @RequestBody UpdateTaskRequest body) {
        String title = body.getTitle() == null ? null : body.getTitle().trim();
        String description = body.getDescription() == null ? null : body.getDescription().trim();
        return taskService
                .updateTask(id, title, description, body.getCompleted())
                .orElseThrow(() -> AppException.notFound("Task not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        if (!taskService.deleteTask(id)) {
            throw AppException.notFound("Task not found");
        }
        return ResponseEntity.noContent().build();
    }
}
