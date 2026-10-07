# 📋 Task Manager

A full-stack task management application with a **React (TypeScript)** frontend
and a **Rust (Axum)** backend. Create, update, complete, and delete tasks
through a small REST API backed by an in-memory store.

## ✨ Features

- Create tasks with a title and optional description
- List all tasks and fetch a single task by id
- Mark tasks complete / incomplete
- Update a task's title, description, or completion state
- Delete tasks
- Fully typed end to end (TypeScript on the frontend, Rust types on the backend)
- CI pipelines for both the frontend and backend

## 🧰 Tech Stack

| Layer    | Technology                                             |
|----------|--------------------------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest, Testing Library    |
| Backend  | Rust, Axum, Tokio, Serde, Uuid, Chrono, tower-http CORS|
| Storage  | In-memory `HashMap` (no external database required)    |
| CI       | GitHub Actions                                         |

## 🗂️ Project Structure

```
.
├── backend/              # Rust + Axum REST API
│   ├── src/
│   │   ├── main.rs       # Binary entrypoint, starts the server
│   │   ├── app.rs        # Router / app wiring
│   │   ├── routes.rs     # HTTP handlers for task endpoints
│   │   ├── models.rs     # Task, CreateTaskDto, UpdateTaskDto types
│   │   ├── state.rs      # In-memory task store (AppState)
│   │   ├── error.rs      # Error types and HTTP responses
│   │   └── lib.rs        # Library root
│   └── tests/            # Integration tests
├── frontend/             # React + TypeScript + Vite UI
│   └── src/
│       ├── api/          # Typed API client (fetch wrappers)
│       ├── components/   # TaskForm, TaskList, TaskItem
│       ├── hooks/        # useTasks data hook
│       └── App.tsx       # Root component
└── .github/
    └── workflows/
        ├── backend.yml   # CI: fmt, clippy, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## 📦 Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain, 2021 edition) and Cargo
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
> `http://localhost:3001`, so start the backend first for a fully working UI.

## 🔌 API Endpoints

Base URL: `http://localhost:3001`

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

### 🧩 Data Model

A `Task` is returned as JSON in the following shape:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Write the docs",
  "description": "Expand the project README",
  "completed": false,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

**Create** (`POST /api/tasks`) accepts a `title` (required) and an optional
`description`:

```json
{ "title": "Write the docs", "description": "Expand the project README" }
```

**Update** (`PATCH /api/tasks/:id`) accepts any subset of `title`,
`description`, and `completed`:

```json
{ "completed": true }
```

### 🛠️ Example Requests

```bash
# Create a task
curl -X POST http://localhost:3001/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Write the docs","description":"Expand the README"}'

# List tasks
curl http://localhost:3001/api/tasks

# Mark a task complete
curl -X PATCH http://localhost:3001/api/tasks/<id> \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3001/api/tasks/<id>
```

> ℹ️ Tasks are stored in memory, so they are reset whenever the backend
> restarts.

## 🧪 Testing

```bash
cd backend && cargo test     # Backend integration tests
cd frontend && npm test      # Frontend unit/component tests
```

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 📄 License

This project is licensed under the terms described in the [LICENSE](./LICENSE) file.
