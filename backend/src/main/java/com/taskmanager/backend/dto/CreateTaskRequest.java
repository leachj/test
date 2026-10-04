package com.taskmanager.backend.dto;

/** Request body for {@code POST /api/tasks}. Both fields are optional at the JSON level. */
public class CreateTaskRequest {

    private String title;
    private String description;

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
}
