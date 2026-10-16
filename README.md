# 📋 Task Manager

A full-stack task management application with a React (TypeScript) frontend and a Rust (Axum) backend. Tasks are stored in memory on the server, so the API is fast and dependency-free — perfect for local development, demos, or as a learning reference for building a small full-stack app.

## ✨ Features

- Create, list, view, update, and delete tasks via a REST API
- In-memory storage on the backend (no database required to get started)
- React + TypeScript frontend with a Vite dev server that proxies API calls
- CORS enabled on the backend for local cross-origin development
- CI pipelines for both backend (fmt, clippy, build, test) and frontend (lint, build, test)

## 📋 Prerequisites

- **Rust** (stable toolchain) and Cargo — install via [rustup](https://rustup.rs/)
- **Node.js** 18+ and npm

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

### ⚙️ Configuration

| Variable | Default | Description                                  |
|----------|---------|-----------------------------------------------|
| `PORT`   | `3001`  | Port the backend HTTP server listens on       |

The frontend reads its API target from `frontend/vite.config.ts` (proxy) and doesn't require any environment variables for local development.

## 🔌 API Endpoints

All request/response bodies are JSON. The backend stores tasks in memory, so data resets whenever the server restarts.

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

#### Task object

```json
{
  "id": "b3f1c2e4-...",
  "title": "Write the README",
  "description": "Add more detail about the API",
  "completed": false,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

#### Create a task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write the README", "description": "Add more detail"}'
```

`title` is required (returns `400 Bad Request` if missing/blank); `description` is optional. A successful create returns `201 Created` with the new task.

#### Update a task

```bash
curl -X PATCH http://localhost:3001/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

Any of `title`, `description`, or `completed` may be included; omitted fields are left unchanged. Returns `404 Not Found` for an unknown `id`.

#### Delete a task

```bash
curl -X DELETE http://localhost:3001/api/tasks/<id>
```

Returns `204 No Content` on success, or `404 Not Found` if the task doesn't exist.

## 🧪 Testing

- Backend: `cd backend && cargo test` — integration tests in `backend/tests/tasks.rs` exercise the full request/response cycle for each endpoint.
- Frontend: `cd frontend && npm test` — component tests powered by Vitest and React Testing Library.

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 🤝 Contributing

1. Fork the repo and create a feature branch.
2. Make your changes, following the existing code style (`cargo fmt` / ESLint).
3. Run the relevant test suite(s) locally before opening a PR.
4. Open a pull request against `main` — CI must pass before merging.
