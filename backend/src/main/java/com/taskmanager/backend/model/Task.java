package com.taskmanager.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Mirrors the {@code Task} shape from the original TypeScript/Rust
 * implementations, serialized with a camelCase {@code createdAt} field.
 */
public class Task {

    private String id;
    private String title;
    private String description;
    private boolean completed;

    @JsonProperty("createdAt")
    private String createdAt;

    public Task() {
    }

    public Task(String id, String title, String description, boolean completed, String createdAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    /** Returns a copy of this task with the given field overrides applied. */
    public Task withUpdates(String title, String description, Boolean completed) {
        return new Task(
                this.id,
                title != null ? title : this.title,
                description != null ? description : this.description,
                completed != null ? completed : this.completed,
                this.createdAt);
    }
}
