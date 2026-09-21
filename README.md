# 📋 Task Manager

A full-stack application with a React (TypeScript) frontend and a Rust (Axum) backend. Create, update, complete, and delete tasks through a small REST API backed by an in-memory store.

## 🧰 Tech Stack

| Layer     | Technologies                                                        |
|-----------|---------------------------------------------------------------------|
| Frontend  | React, TypeScript, Vite, Vitest, ESLint                             |
| Backend   | Rust, Axum, Tokio, Serde, `uuid`, `chrono`, `tower-http` (CORS)     |
| Storage   | In-memory `HashMap` guarded by a `Mutex` (no external database)     |
| CI        | GitHub Actions (separate backend and frontend workflows)           |

> ℹ️ Tasks are held in memory only, so all data is reset whenever the backend restarts.

## 🗂️ Project Structure

```
.
├── backend/    # Rust + Axum REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: fmt, clippy, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## 🚀 Getting Started

### 🦀 Backend

```bash
cd backend
cargo run           # Start dev server on http://localhost:3001
cargo build --release  # Production build
cargo test          # Run tests
cargo clippy        # Lint
cargo fmt           # Format
```

### ⚛️ Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
npm run build      # Production build → dist/
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`.

## 🔌 API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

### 🧾 Task Model

Each task returned by the API has the following shape:

```json
{
  "id": "uuid-v4-string",
  "title": "Write the README",
  "description": "Add more detail to the project README",
  "completed": false,
  "createdAt": "2026-01-01T12:00:00Z"
}
```

- `POST /api/tasks` accepts a JSON body with `title` and optional `description`.
- `PATCH /api/tasks/:id` accepts any subset of `title`, `description`, and `completed`.
- `id` and `createdAt` are generated server-side and are read-only.

## 🧪 Testing

Both sides ship with their own test suites, which also run in CI:

```bash
cd backend && cargo test      # Backend integration tests (backend/tests/tasks.rs)
cd frontend && npm test       # Frontend component tests (Vitest)
```

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 🤝 Contributing

1. Create a feature branch off `main`.
2. Make your changes and add or update tests as needed.
3. Run the backend (`cargo fmt`, `cargo clippy`, `cargo test`) and frontend (`npm run lint`, `npm test`) checks locally.
4. Open a pull request against `main`; both CI workflows must pass before merge.

## 📄 License

Released under the terms of the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
