#pragma once

#include <chrono>
#include <iomanip>
#include <random>
#include <sstream>
#include <string>

#include "error.hpp"
#include "httplib.h"
#include "models.hpp"
#include "nlohmann/json.hpp"
#include "state.hpp"

// Utility helpers shared by the route handlers.
namespace util {

inline std::string trim(const std::string& s) {
    const char* whitespace = " \t\n\r\f\v";
    auto start = s.find_first_not_of(whitespace);
    if (start == std::string::npos) return "";
    auto end = s.find_last_not_of(whitespace);
    return s.substr(start, end - start + 1);
}

// RFC3339 / ISO8601 UTC timestamp with fractional seconds, matching the
// output of Rust's `chrono::Utc::now().to_rfc3339()`.
inline std::string now_rfc3339() {
    using namespace std::chrono;
    auto now = system_clock::now();
    auto ms = duration_cast<milliseconds>(now.time_since_epoch()) % 1000;
    std::time_t t = system_clock::to_time_t(now);
    std::tm tm{};
    gmtime_r(&t, &tm);
    std::ostringstream oss;
    oss << std::put_time(&tm, "%Y-%m-%dT%H:%M:%S");
    oss << '.' << std::setfill('0') << std::setw(3) << ms.count() << "+00:00";
    return oss.str();
}

inline std::string uuid_v4() {
    static thread_local std::mt19937_64 rng{std::random_device{}()};
    std::uniform_int_distribution<int> dist(0, 15);
    static const char* hex = "0123456789abcdef";
    const char layout[] = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    std::string out = layout;
    for (auto& c : out) {
        if (c == 'x') {
            c = hex[dist(rng)];
        } else if (c == 'y') {
            c = hex[(dist(rng) & 0x3) | 0x8];
        }
    }
    return out;
}

}  // namespace util

// Registers `/health` and `/api/tasks` routes on the given httplib server,
// backed by `state`. Mirrors `build_app` from the Rust `app.rs`.
inline void build_app(httplib::Server& server, AppState state) {
    server.set_default_headers({
        {"Access-Control-Allow-Origin", "*"},
        {"Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"},
        {"Access-Control-Allow-Headers", "Content-Type"},
    });

    server.Options(R"(.*)", [](const httplib::Request&, httplib::Response& res) {
        res.status = 204;
    });

    server.Get("/health", [](const httplib::Request&, httplib::Response& res) {
        res.set_content(nlohmann::json{{"status", "ok"}}.dump(), "application/json");
    });

    server.Get("/api/tasks", [state](const httplib::Request&, httplib::Response& res) {
        nlohmann::json arr = nlohmann::json::array();
        for (const auto& task : state.list()) {
            arr.push_back(task);
        }
        res.set_content(arr.dump(), "application/json");
    });

    server.Post("/api/tasks", [state](const httplib::Request& req, httplib::Response& res) {
        nlohmann::json body;
        try {
            body = req.body.empty() ? nlohmann::json::object() : nlohmann::json::parse(req.body);
        } catch (const nlohmann::json::parse_error&) {
            AppError::bad_request("Invalid JSON body").write_to(res);
            return;
        }

        std::string title = body.value("title", std::string());
        std::string trimmed_title = util::trim(title);
        if (trimmed_title.empty()) {
            AppError::bad_request("Title is required").write_to(res);
            return;
        }

        Task task;
        task.id = util::uuid_v4();
        task.title = trimmed_title;
        task.description = util::trim(body.value("description", std::string()));
        task.completed = false;
        task.created_at = util::now_rfc3339();

        state.insert(task);

        res.status = 201;
        res.set_content(nlohmann::json(task).dump(), "application/json");
    });

    server.Get(R"(/api/tasks/([^/]+))", [state](const httplib::Request& req, httplib::Response& res) {
        auto id = req.matches[1];
        auto task = state.get(id);
        if (!task) {
            AppError::not_found("Task not found").write_to(res);
            return;
        }
        res.set_content(nlohmann::json(*task).dump(), "application/json");
    });

    server.Patch(R"(/api/tasks/([^/]+))", [state](const httplib::Request& req, httplib::Response& res) {
        auto id = req.matches[1];
        auto existing = state.get(id);
        if (!existing) {
            AppError::not_found("Task not found").write_to(res);
            return;
        }

        nlohmann::json body;
        try {
            body = req.body.empty() ? nlohmann::json::object() : nlohmann::json::parse(req.body);
        } catch (const nlohmann::json::parse_error&) {
            AppError::bad_request("Invalid JSON body").write_to(res);
            return;
        }

        Task updated = *existing;
        if (body.contains("title") && !body["title"].is_null()) {
            updated.title = util::trim(body["title"].get<std::string>());
        }
        if (body.contains("description") && !body["description"].is_null()) {
            updated.description = util::trim(body["description"].get<std::string>());
        }
        if (body.contains("completed") && !body["completed"].is_null()) {
            updated.completed = body["completed"].get<bool>();
        }

        state.insert(updated);
        res.set_content(nlohmann::json(updated).dump(), "application/json");
    });

    server.Delete(R"(/api/tasks/([^/]+))", [state](const httplib::Request& req, httplib::Response& res) {
        auto id = req.matches[1];
        if (!state.remove(id)) {
            AppError::not_found("Task not found").write_to(res);
            return;
        }
        res.status = 204;
    });
}
