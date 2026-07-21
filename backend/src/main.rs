use backend::{app::build_app, state::AppState};

#[tokio::main]
async fn main() {
    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(3001);

    let app = build_app(AppState::new());

    let listener = tokio::net::TcpListener::bind(("0.0.0.0", port))
        .await
        .expect("failed to bind port");

    println!("Backend server running on http://localhost:{port}");

    axum::serve(listener, app).await.expect("server error");
}
