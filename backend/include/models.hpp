#pragma once

#include <optional>
#include <string>

#include "nlohmann/json.hpp"

// Mirrors the `Task` struct from the Rust backend, serialized with the
// same field names (createdAt uses camelCase to match the original API).
struct Task {
    std::string id;
    std::string title;
    std::string description;
    bool completed = false;
    std::string created_at;
};

inline void to_json(nlohmann::json& j, const Task& t) {
    j = nlohmann::json{
        {"id", t.id},
        {"title", t.title},
        {"description", t.description},
        {"completed", t.completed},
        {"createdAt", t.created_at},
    };
}

// DTO for creating a task. Fields are optional in the request body, matching
// the Rust `CreateTaskDto`.
struct CreateTaskDto {
    std::optional<std::string> title;
    std::optional<std::string> description;
};

// DTO for updating a task. All fields optional, matching `UpdateTaskDto`.
struct UpdateTaskDto {
    std::optional<std::string> title;
    std::optional<std::string> description;
    std::optional<bool> completed;
};
