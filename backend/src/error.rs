use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

/// Mirrors the TypeScript `AppError` shape: an error with an HTTP status
/// code and a message, serialized as `{ error: { message, statusCode } }`.
#[derive(Debug)]
pub struct AppError {
    pub status_code: StatusCode,
    pub message: String,
}

impl AppError {
    pub fn not_found(message: impl Into<String>) -> Self {
        Self {
            status_code: StatusCode::NOT_FOUND,
            message: message.into(),
        }
    }

    pub fn bad_request(message: impl Into<String>) -> Self {
        Self {
            status_code: StatusCode::BAD_REQUEST,
            message: message.into(),
        }
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let status = self.status_code;
        let body = Json(json!({
            "error": {
                "message": self.message,
                "statusCode": status.as_u16(),
            }
        }));
        (status, body).into_response()
    }
}
