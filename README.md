# 📋 Task Manager

A full-stack task management application with a React (TypeScript) frontend and a Rust (Axum) backend. Tasks are stored in memory on the backend and exposed via a simple REST API.

## 🧰 Tech Stack

| Layer    | Technology                                      |
|----------|--------------------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest, ESLint       |
| Backend  | Rust, Axum, Tokio, Serde, Tower-HTTP (CORS)      |
| CI       | GitHub Actions (fmt/clippy/build/test, lint/build/test) |

## ✅ Prerequisites

Make sure you have the following installed before getting started:

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain, includes `cargo`)
- [Node.js](https://nodejs.org/) 18+ and npm

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

### Task shape

```json
{
  "id": "5c1b2e3a-...",
  "title": "Write more docs",
  "description": "Expand the README with usage details",
  "completed": false,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### Example requests

```bash
# Create a task
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write more docs", "description": "Expand the README"}'

# Mark a task as completed
curl -X PATCH http://localhost:3001/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3001/api/tasks/<id>
```

`title` and `description` are optional on create and default to empty strings; `completed` defaults to `false`. All fields on `PATCH` are optional and only the supplied fields are updated.

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 🤝 Contributing

1. Fork the repo and create a feature branch from `main`.
2. Make your changes, following the existing formatting/lint conventions (`cargo fmt`, `cargo clippy`, `npm run lint`).
3. Add or update tests for any behavior changes (`cargo test`, `npm test`).
4. Open a pull request describing your change — CI must pass before merging.

