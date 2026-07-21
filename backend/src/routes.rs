use axum::{
    extract::{Path, State},
    routing::get,
    Json, Router,
};
use chrono::Utc;
use uuid::Uuid;

use crate::{
    error::AppError,
    models::{CreateTaskDto, Task, UpdateTaskDto},
    state::AppState,
};

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/", get(list_tasks).post(create_task))
        .route("/:id", get(get_task).patch(update_task).delete(delete_task))
        .with_state(state)
}

async fn list_tasks(State(state): State<AppState>) -> Json<Vec<Task>> {
    let tasks = state.tasks.lock().unwrap();
    Json(tasks.values().cloned().collect())
}

async fn get_task(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<Task>, AppError> {
    let tasks = state.tasks.lock().unwrap();
    match tasks.get(&id) {
        Some(task) => Ok(Json(task.clone())),
        None => Err(AppError::not_found("Task not found")),
    }
}

async fn create_task(
    State(state): State<AppState>,
    Json(body): Json<CreateTaskDto>,
) -> Result<(axum::http::StatusCode, Json<Task>), AppError> {
    let title = body.title.unwrap_or_default();
    let trimmed_title = title.trim();
    if trimmed_title.is_empty() {
        return Err(AppError::bad_request("Title is required"));
    }

    let task = Task {
        id: Uuid::new_v4().to_string(),
        title: trimmed_title.to_string(),
        description: body
            .description
            .map(|d| d.trim().to_string())
            .unwrap_or_default(),
        completed: false,
        created_at: Utc::now().to_rfc3339(),
    };

    state
        .tasks
        .lock()
        .unwrap()
        .insert(task.id.clone(), task.clone());

    Ok((axum::http::StatusCode::CREATED, Json(task)))
}

async fn update_task(
    State(state): State<AppState>,
    Path(id): Path<String>,
    Json(body): Json<UpdateTaskDto>,
) -> Result<Json<Task>, AppError> {
    let mut tasks = state.tasks.lock().unwrap();
    let existing = match tasks.get(&id) {
        Some(task) => task.clone(),
        None => return Err(AppError::not_found("Task not found")),
    };

    let updated = Task {
        id: existing.id,
        title: body
            .title
            .map(|t| t.trim().to_string())
            .unwrap_or(existing.title),
        description: body
            .description
            .map(|d| d.trim().to_string())
            .unwrap_or(existing.description),
        completed: body.completed.unwrap_or(existing.completed),
        created_at: existing.created_at,
    };

    tasks.insert(updated.id.clone(), updated.clone());
    Ok(Json(updated))
}

async fn delete_task(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<axum::http::StatusCode, AppError> {
    let mut tasks = state.tasks.lock().unwrap();
    if tasks.remove(&id).is_none() {
        return Err(AppError::not_found("Task not found"));
    }
    Ok(axum::http::StatusCode::NO_CONTENT)
}
