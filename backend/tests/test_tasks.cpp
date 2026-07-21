// Port of the Rust `backend/tests/tasks.rs` integration test suite.
// Each test spins up the C++ backend on a local port and drives it with an
// httplib::Client, mirroring the original `oneshot()`-based Axum tests.

#include <atomic>
#include <chrono>
#include <thread>

#include "app.hpp"
#include "catch_amalgamated.hpp"
#include "httplib.h"
#include "nlohmann/json.hpp"
#include "state.hpp"

using json = nlohmann::json;

namespace {

constexpr int kTestPort = 18080;

// Starts a fresh server + state for a single test case and tears it down
// afterwards, matching `app_with_fresh_state()` in the Rust tests.
class TestServer {
public:
    TestServer() {
        AppState state;
        state.clear_tasks();
        build_app(server_, state);

        std::atomic<bool> ready{false};
        server_.bind_to_port("127.0.0.1", kTestPort);
        thread_ = std::thread([this, &ready]() {
            ready = true;
            server_.listen_after_bind();
        });
        while (!ready) {
            std::this_thread::sleep_for(std::chrono::milliseconds(1));
        }
        // Give the listener a brief moment to actually start accepting.
        std::this_thread::sleep_for(std::chrono::milliseconds(20));
    }

    ~TestServer() {
        server_.stop();
        if (thread_.joinable()) thread_.join();
    }

    httplib::Client client() {
        httplib::Client cli("127.0.0.1", kTestPort);
        cli.set_connection_timeout(2);
        return cli;
    }

private:
    httplib::Server server_;
    std::thread thread_;
};

}  // namespace

TEST_CASE("health returns ok status") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Get("/health");
    REQUIRE(res);
    REQUIRE(res->status == 200);
    REQUIRE(json::parse(res->body) == json{{"status", "ok"}});
}

TEST_CASE("get tasks returns empty array when no tasks exist") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Get("/api/tasks");
    REQUIRE(res);
    REQUIRE(res->status == 200);
    REQUIRE(json::parse(res->body) == json::array());
}

TEST_CASE("get tasks returns all tasks") {
    TestServer server;
    auto cli = server.client();
    cli.Post("/api/tasks", json{{"title", "Task 1"}}.dump(), "application/json");
    cli.Post("/api/tasks", json{{"title", "Task 2"}}.dump(), "application/json");

    auto res = cli.Get("/api/tasks");
    REQUIRE(res);
    REQUIRE(res->status == 200);
    REQUIRE(json::parse(res->body).size() == 2);
}

TEST_CASE("post tasks creates a task with title") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Post("/api/tasks",
                         json{{"title", "My Task"}, {"description", "Some description"}}.dump(),
                         "application/json");
    REQUIRE(res);
    REQUIRE(res->status == 201);
    auto body = json::parse(res->body);
    REQUIRE(body["title"] == "My Task");
    REQUIRE(body["description"] == "Some description");
    REQUIRE(body["completed"] == false);
    REQUIRE(body["id"].is_string());
    REQUIRE(body["createdAt"].is_string());
}

TEST_CASE("post tasks returns 400 when title is missing") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Post("/api/tasks", json{{"description", "no title"}}.dump(), "application/json");
    REQUIRE(res);
    REQUIRE(res->status == 400);
}

TEST_CASE("post tasks returns 400 when title is empty") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Post("/api/tasks", json{{"title", "   "}}.dump(), "application/json");
    REQUIRE(res);
    REQUIRE(res->status == 400);
}

TEST_CASE("get task by id returns task") {
    TestServer server;
    auto cli = server.client();
    auto create = cli.Post("/api/tasks", json{{"title", "Find me"}}.dump(), "application/json");
    auto id = json::parse(create->body)["id"].get<std::string>();

    auto res = cli.Get(("/api/tasks/" + id).c_str());
    REQUIRE(res);
    REQUIRE(res->status == 200);
    REQUIRE(json::parse(res->body)["title"] == "Find me");
}

TEST_CASE("get task by id returns 404 for unknown id") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Get("/api/tasks/nonexistent");
    REQUIRE(res);
    REQUIRE(res->status == 404);
}

TEST_CASE("patch task updates fields") {
    TestServer server;
    auto cli = server.client();
    auto create = cli.Post("/api/tasks", json{{"title", "Original"}}.dump(), "application/json");
    auto id = json::parse(create->body)["id"].get<std::string>();

    auto res = cli.Patch(("/api/tasks/" + id).c_str(),
                          json{{"title", "Updated"}, {"completed", true}}.dump(),
                          "application/json");
    REQUIRE(res);
    REQUIRE(res->status == 200);
    auto body = json::parse(res->body);
    REQUIRE(body["title"] == "Updated");
    REQUIRE(body["completed"] == true);
}

TEST_CASE("patch task returns 404 for unknown id") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Patch("/api/tasks/nonexistent", json{{"title", "x"}}.dump(), "application/json");
    REQUIRE(res);
    REQUIRE(res->status == 404);
}

TEST_CASE("delete task deletes a task") {
    TestServer server;
    auto cli = server.client();
    auto create = cli.Post("/api/tasks", json{{"title", "Delete me"}}.dump(), "application/json");
    auto id = json::parse(create->body)["id"].get<std::string>();

    auto del = cli.Delete(("/api/tasks/" + id).c_str());
    REQUIRE(del);
    REQUIRE(del->status == 204);

    auto get = cli.Get(("/api/tasks/" + id).c_str());
    REQUIRE(get);
    REQUIRE(get->status == 404);
}

TEST_CASE("delete task returns 404 for unknown id") {
    TestServer server;
    auto cli = server.client();
    auto res = cli.Delete("/api/tasks/nonexistent");
    REQUIRE(res);
    REQUIRE(res->status == 404);
}
