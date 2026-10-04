package com.taskmanager.backend.exception;

import org.springframework.http.HttpStatus;

/**
 * Mirrors the Rust/TypeScript {@code AppError} shape: an error with an HTTP
 * status code and a message, serialized as {@code { error: { message, statusCode } }}.
 */
public class AppException extends RuntimeException {

    private final HttpStatus status;

    public AppException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public static AppException notFound(String message) {
        return new AppException(HttpStatus.NOT_FOUND, message);
    }

    public static AppException badRequest(String message) {
        return new AppException(HttpStatus.BAD_REQUEST, message);
    }

    public HttpStatus getStatus() {
        return status;
    }
}
