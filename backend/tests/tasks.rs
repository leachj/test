use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use backend::{app::build_app, state::AppState};
use http_body_util::BodyExt;
use serde_json::{json, Value};
use tower::ServiceExt;

fn app_with_fresh_state() -> axum::Router {
    let state = AppState::new();
    state.clear_tasks();
    build_app(state)
}

async fn body_json(response: axum::response::Response) -> Value {
    let bytes = response.into_body().collect().await.unwrap().to_bytes();
    if bytes.is_empty() {
        return Value::Null;
    }
    serde_json::from_slice(&bytes).unwrap()
}

fn json_request(method: &str, uri: &str, body: Value) -> Request<Body> {
    Request::builder()
        .method(method)
        .uri(uri)
        .header("content-type", "application/json")
        .body(Body::from(body.to_string()))
        .unwrap()
}

fn get_request(uri: &str) -> Request<Body> {
    Request::builder()
        .method("GET")
        .uri(uri)
        .body(Body::empty())
        .unwrap()
}

#[tokio::test]
async fn health_returns_ok_status() {
    let app = app_with_fresh_state();
    let res = app.oneshot(get_request("/health")).await.unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    assert_eq!(body_json(res).await, json!({ "status": "ok" }));
}

#[tokio::test]
async fn get_tasks_returns_empty_array_when_no_tasks_exist() {
    let app = app_with_fresh_state();
    let res = app.oneshot(get_request("/api/tasks")).await.unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    assert_eq!(body_json(res).await, json!([]));
}

#[tokio::test]
async fn get_tasks_returns_all_tasks() {
    let app = app_with_fresh_state();
    let app1 = app.clone();
    app1.oneshot(json_request(
        "POST",
        "/api/tasks",
        json!({ "title": "Task 1" }),
    ))
    .await
    .unwrap();
    let app2 = app.clone();
    app2.oneshot(json_request(
        "POST",
        "/api/tasks",
        json!({ "title": "Task 2" }),
    ))
    .await
    .unwrap();

    let res = app.oneshot(get_request("/api/tasks")).await.unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    let body = body_json(res).await;
    assert_eq!(body.as_array().unwrap().len(), 2);
}

#[tokio::test]
async fn post_tasks_creates_a_task_with_title() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "My Task", "description": "Some description" }),
        ))
        .await
        .unwrap();

    assert_eq!(res.status(), StatusCode::CREATED);
    let body = body_json(res).await;
    assert_eq!(body["title"], "My Task");
    assert_eq!(body["description"], "Some description");
    assert_eq!(body["completed"], false);
    assert!(body["id"].is_string());
    assert!(body["createdAt"].is_string());
}

#[tokio::test]
async fn post_tasks_returns_400_when_title_is_missing() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "description": "no title" }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn post_tasks_returns_400_when_title_is_empty() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "   " }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn get_task_by_id_returns_task() {
    let app = app_with_fresh_state();
    let create = app
        .clone()
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Find me" }),
        ))
        .await
        .unwrap();
    let created = body_json(create).await;
    let id = created["id"].as_str().unwrap();

    let res = app
        .oneshot(get_request(&format!("/api/tasks/{id}")))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    let body = body_json(res).await;
    assert_eq!(body["title"], "Find me");
}

#[tokio::test]
async fn get_task_by_id_returns_404_for_unknown_id() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(get_request("/api/tasks/nonexistent"))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn patch_task_updates_fields() {
    let app = app_with_fresh_state();
    let create = app
        .clone()
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Original" }),
        ))
        .await
        .unwrap();
    let created = body_json(create).await;
    let id = created["id"].as_str().unwrap();

    let res = app
        .oneshot(json_request(
            "PATCH",
            &format!("/api/tasks/{id}"),
            json!({ "title": "Updated", "completed": true }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    let body = body_json(res).await;
    assert_eq!(body["title"], "Updated");
    assert_eq!(body["completed"], true);
}

#[tokio::test]
async fn patch_task_returns_404_for_unknown_id() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "PATCH",
            "/api/tasks/nonexistent",
            json!({ "title": "x" }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn delete_task_deletes_a_task() {
    let app = app_with_fresh_state();
    let create = app
        .clone()
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Delete me" }),
        ))
        .await
        .unwrap();
    let created = body_json(create).await;
    let id = created["id"].as_str().unwrap().to_string();

    let del = app
        .clone()
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri(format!("/api/tasks/{id}"))
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(del.status(), StatusCode::NO_CONTENT);

    let get = app
        .oneshot(get_request(&format!("/api/tasks/{id}")))
        .await
        .unwrap();
    assert_eq!(get.status(), StatusCode::NOT_FOUND);
}

#[tokio::test]
async fn post_tasks_creates_a_task_with_due_date() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "With due date", "dueDate": "2030-01-15T00:00:00Z" }),
        ))
        .await
        .unwrap();

    assert_eq!(res.status(), StatusCode::CREATED);
    let body = body_json(res).await;
    assert_eq!(body["dueDate"], "2030-01-15T00:00:00+00:00");
}

#[tokio::test]
async fn post_tasks_creates_a_task_without_due_date() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "No due date" }),
        ))
        .await
        .unwrap();

    assert_eq!(res.status(), StatusCode::CREATED);
    let body = body_json(res).await;
    assert!(body.get("dueDate").is_none() || body["dueDate"].is_null());
}

#[tokio::test]
async fn post_tasks_returns_400_when_due_date_is_invalid() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Bad due date", "dueDate": "not-a-date" }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::BAD_REQUEST);
}

#[tokio::test]
async fn patch_task_updates_due_date() {
    let app = app_with_fresh_state();
    let create = app
        .clone()
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Original" }),
        ))
        .await
        .unwrap();
    let created = body_json(create).await;
    let id = created["id"].as_str().unwrap();

    let res = app
        .oneshot(json_request(
            "PATCH",
            &format!("/api/tasks/{id}"),
            json!({ "dueDate": "2030-06-01T12:00:00Z" }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    let body = body_json(res).await;
    assert_eq!(body["dueDate"], "2030-06-01T12:00:00+00:00");
}

#[tokio::test]
async fn patch_task_clears_due_date_when_set_to_null() {
    let app = app_with_fresh_state();
    let create = app
        .clone()
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Original", "dueDate": "2030-01-01T00:00:00Z" }),
        ))
        .await
        .unwrap();
    let created = body_json(create).await;
    let id = created["id"].as_str().unwrap();

    let res = app
        .oneshot(json_request(
            "PATCH",
            &format!("/api/tasks/{id}"),
            json!({ "dueDate": null }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    let body = body_json(res).await;
    assert!(body.get("dueDate").is_none() || body["dueDate"].is_null());
}

#[tokio::test]
async fn patch_task_leaves_due_date_unchanged_when_omitted() {
    let app = app_with_fresh_state();
    let create = app
        .clone()
        .oneshot(json_request(
            "POST",
            "/api/tasks",
            json!({ "title": "Original", "dueDate": "2030-01-01T00:00:00Z" }),
        ))
        .await
        .unwrap();
    let created = body_json(create).await;
    let id = created["id"].as_str().unwrap();

    let res = app
        .oneshot(json_request(
            "PATCH",
            &format!("/api/tasks/{id}"),
            json!({ "title": "Updated" }),
        ))
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::OK);
    let body = body_json(res).await;
    assert_eq!(body["dueDate"], "2030-01-01T00:00:00+00:00");
}

#[tokio::test]
async fn delete_task_returns_404_for_unknown_id() {
    let app = app_with_fresh_state();
    let res = app
        .oneshot(
            Request::builder()
                .method("DELETE")
                .uri("/api/tasks/nonexistent")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();
    assert_eq!(res.status(), StatusCode::NOT_FOUND);
}
