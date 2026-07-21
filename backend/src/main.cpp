#include <cstdlib>
#include <iostream>
#include <string>

#include "app.hpp"
#include "httplib.h"
#include "state.hpp"

int main() {
    int port = 3001;
    if (const char* env_port = std::getenv("PORT")) {
        try {
            port = std::stoi(env_port);
        } catch (...) {
            // Fall back to the default port if PORT is not a valid integer.
        }
    }

    httplib::Server server;
    AppState state;
    build_app(server, state);

    std::cout << "Backend server running on http://localhost:" << port << "\n";
    server.listen("0.0.0.0", port);
    return 0;
}
