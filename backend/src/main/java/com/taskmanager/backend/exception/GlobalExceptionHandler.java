package com.taskmanager.backend.exception;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<Map<String, Object>> handleAppException(AppException ex) {
        return ResponseEntity.status(ex.getStatus()).body(errorBody(ex.getStatus(), ex.getMessage()));
    }

    private static Map<String, Object> errorBody(HttpStatus status, String message) {
        Map<String, Object> error = new LinkedHashMap<>();
        error.put("message", message);
        error.put("statusCode", status.value());

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("error", error);
        return body;
    }
}
