use axum::{routing::get, Json, Router};
use serde_json::{json, Value};
use tower_http::cors::CorsLayer;

use crate::{routes, state::AppState};

pub fn build_app(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health))
        .nest("/api/tasks", routes::router(state))
        .layer(CorsLayer::permissive())
}

async fn health() -> Json<Value> {
    Json(json!({ "status": "ok" }))
}
