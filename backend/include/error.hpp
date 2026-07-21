#pragma once

#include <string>

#include "httplib.h"
#include "nlohmann/json.hpp"

// Mirrors the Rust `AppError`: an error with an HTTP status code and a
// message, serialized as `{ error: { message, statusCode } }`.
struct AppError {
    int status_code;
    std::string message;

    static AppError not_found(std::string message) {
        return AppError{404, std::move(message)};
    }

    static AppError bad_request(std::string message) {
        return AppError{400, std::move(message)};
    }

    void write_to(httplib::Response& res) const {
        nlohmann::json body{
            {"error",
             {
                 {"message", message},
                 {"statusCode", status_code},
             }},
        };
        res.status = status_code;
        res.set_content(body.dump(), "application/json");
    }
};
