#pragma once

#include <algorithm>
#include <map>
#include <memory>
#include <mutex>
#include <optional>
#include <string>
#include <vector>

#include "models.hpp"

// In-memory task store, mirroring the Rust `AppState` (Arc<Mutex<HashMap>>).
// Insertion order is tracked separately so that listing tasks preserves
// creation order (std::map would otherwise sort by id).
class AppState {
public:
    AppState() : tasks_(std::make_shared<Tasks>()) {}

    std::vector<Task> list() const {
        std::lock_guard<std::mutex> lock(tasks_->mutex);
        std::vector<Task> result;
        result.reserve(tasks_->order.size());
        for (const auto& id : tasks_->order) {
            result.push_back(tasks_->by_id.at(id));
        }
        return result;
    }

    std::optional<Task> get(const std::string& id) const {
        std::lock_guard<std::mutex> lock(tasks_->mutex);
        auto it = tasks_->by_id.find(id);
        if (it == tasks_->by_id.end()) return std::nullopt;
        return it->second;
    }

    void insert(const Task& task) const {
        std::lock_guard<std::mutex> lock(tasks_->mutex);
        if (tasks_->by_id.find(task.id) == tasks_->by_id.end()) {
            tasks_->order.push_back(task.id);
        }
        tasks_->by_id[task.id] = task;
    }

    bool remove(const std::string& id) const {
        std::lock_guard<std::mutex> lock(tasks_->mutex);
        auto it = tasks_->by_id.find(id);
        if (it == tasks_->by_id.end()) return false;
        tasks_->by_id.erase(it);
        tasks_->order.erase(
            std::remove(tasks_->order.begin(), tasks_->order.end(), id),
            tasks_->order.end());
        return true;
    }

    // Clears all tasks. Used between test cases, matching `clear_tasks()`
    // from the Rust state.
    void clear_tasks() const {
        std::lock_guard<std::mutex> lock(tasks_->mutex);
        tasks_->by_id.clear();
        tasks_->order.clear();
    }

private:
    struct Tasks {
        mutable std::mutex mutex;
        std::map<std::string, Task> by_id;
        std::vector<std::string> order;
    };

    std::shared_ptr<Tasks> tasks_;
};
