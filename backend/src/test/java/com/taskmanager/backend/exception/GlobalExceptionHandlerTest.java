package com.taskmanager.backend.exception;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Unit tests for {@link AppException} and {@link GlobalExceptionHandler},
 * verifying the {@code { error: { message, statusCode } }} response shape.
 */
class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void notFoundFactoryUsesNotFoundStatus() {
        AppException ex = AppException.notFound("Task not found");

        assertThat(ex.getStatus()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(ex.getMessage()).isEqualTo("Task not found");
    }

    @Test
    void badRequestFactoryUsesBadRequestStatus() {
        AppException ex = AppException.badRequest("Title is required");

        assertThat(ex.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(ex.getMessage()).isEqualTo("Title is required");
    }

    @Test
    @SuppressWarnings("unchecked")
    void handleAppExceptionBuildsErrorBodyWithMessageAndStatusCode() {
        AppException ex = AppException.notFound("Task not found");

        ResponseEntity<Map<String, Object>> response = handler.handleAppException(ex);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        Map<String, Object> body = response.getBody();
        assertThat(body).isNotNull();
        Map<String, Object> error = (Map<String, Object>) body.get("error");
        assertThat(error.get("message")).isEqualTo("Task not found");
        assertThat(error.get("statusCode")).isEqualTo(404);
    }

    @Test
    @SuppressWarnings("unchecked")
    void handleAppExceptionReflectsBadRequestStatus() {
        AppException ex = AppException.badRequest("Title is required");

        ResponseEntity<Map<String, Object>> response = handler.handleAppException(ex);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        Map<String, Object> error = (Map<String, Object>) response.getBody().get("error");
        assertThat(error.get("statusCode")).isEqualTo(400);
        assertThat(error.get("message")).isEqualTo("Title is required");
    }
}
