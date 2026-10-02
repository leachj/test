# 📋 Task Manager

A full-stack task management application with a React (TypeScript) frontend and a
Rust (Axum) backend. Create, view, update, and delete tasks through a small REST
API backed by an in-memory store, with a lightweight single-page UI on top.

## ✨ Features

- Create tasks with a title and optional description
- List all tasks and fetch a single task by id
- Toggle a task's completed state
- Delete tasks
- JSON REST API with consistent error responses
- Permissive CORS and a Vite dev proxy for a smooth local workflow
- CI pipelines for both the backend and frontend

## 🧱 Tech Stack

| Layer    | Technologies                                                |
|----------|-------------------------------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest, Testing Library, ESLint |
| Backend  | Rust, Axum 0.7, Tokio, Serde, Uuid, Chrono, tower-http      |
| CI       | GitHub Actions (separate backend and frontend workflows)    |

> **Note:** The backend uses an in-memory store (a `HashMap` guarded by a
> `Mutex`), so all tasks are lost when the server restarts.

## 🗂️ Project Structure

```
.
├── backend/              # Rust + Axum REST API
│   ├── src/
│   │   ├── main.rs       # Binary entrypoint; binds the port and serves the app
│   │   ├── app.rs        # Router assembly: /health + /api/tasks, CORS layer
│   │   ├── routes.rs     # Task CRUD handlers
│   │   ├── models.rs     # Task + request DTO types
│   │   ├── state.rs      # In-memory AppState (HashMap behind a Mutex)
│   │   ├── error.rs      # AppError type and JSON error responses
│   │   └── lib.rs        # Library crate root
│   └── tests/            # Integration tests
├── frontend/             # React + TypeScript + Vite UI
│   └── src/
│       ├── App.tsx       # App shell
│       ├── api/tasks.ts  # Typed API client
│       ├── hooks/        # useTasks data hook
│       └── components/   # TaskList, TaskItem, TaskForm
└── .github/
    └── workflows/
        ├── backend.yml   # CI: fmt, clippy, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## ✅ Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain with `cargo`)
- [Node.js](https://nodejs.org/) 18+ and npm

## 🚀 Getting Started

Run the backend and frontend in two separate terminals.

### 🦀 Backend

```bash
cd backend
cargo run              # Start dev server on http://localhost:3001
cargo build --release  # Production build
cargo test             # Run tests
cargo clippy           # Lint
cargo fmt              # Format
```

The server listens on port `3001` by default. Set the `PORT` environment
variable to change it:

```bash
PORT=4000 cargo run
```

### ⚛️ Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
npm run build      # Production build → dist/
npm test           # Run Vitest tests
npm run test:watch # Run Vitest in watch mode
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at
> `http://localhost:3001`, so start the backend first for a fully working app.

## 🔌 API Reference

Base URL: `http://localhost:3001`

| Method | Path              | Description        | Success status |
|--------|-------------------|--------------------|----------------|
| GET    | `/health`         | Health check       | `200`          |
| GET    | `/api/tasks`      | List all tasks     | `200`          |
| POST   | `/api/tasks`      | Create a task      | `201`          |
| GET    | `/api/tasks/:id`  | Get a single task  | `200`          |
| PATCH  | `/api/tasks/:id`  | Update a task      | `200`          |
| DELETE | `/api/tasks/:id`  | Delete a task      | `204`          |

### Task shape

```json
{
  "id": "e5a9...",
  "title": "Write docs",
  "description": "Expand the README",
  "completed": false,
  "createdAt": "2024-01-01T12:00:00+00:00"
}
```

### Request bodies

`POST /api/tasks` — `title` is required; `description` is optional:

```json
{ "title": "Write docs", "description": "Expand the README" }
```

`PATCH /api/tasks/:id` — all fields are optional; only the supplied fields are
updated:

```json
{ "completed": true }
```

### Error responses

Errors are returned as JSON with the HTTP status code echoed in the body:

```json
{ "error": { "message": "Task not found", "statusCode": 404 } }
```

- `400 Bad Request` — missing/empty `title` on create
- `404 Not Found` — no task with the given id

### Example requests

```bash
# Create a task
curl -X POST http://localhost:3001/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Write docs","description":"Expand the README"}'

# List tasks
curl http://localhost:3001/api/tasks

# Mark a task complete
curl -X PATCH http://localhost:3001/api/tasks/<id> \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3001/api/tasks/<id>
```

## 🧪 Testing

```bash
cd backend && cargo test     # Rust integration tests
cd frontend && npm test      # Vitest component/unit tests
```

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 📄 License

See [LICENSE](LICENSE) for details.
