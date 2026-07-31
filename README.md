# 📋 Task Manager

A full-stack task management application with a React (TypeScript) frontend and a Rust (Axum) backend. It lets users create, view, update, and delete tasks through a simple REST API and web UI.

## ✨ Features

- Create, list, view, update, and delete tasks
- Mark tasks as complete/incomplete
- In-memory data store on the backend (no external database required)
- Type-safe REST API consumed by a React/TypeScript frontend
- Automated CI for both backend (fmt, clippy, build, test) and frontend (lint, build, test)

## 🧰 Prerequisites

Make sure you have the following installed before getting started:

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain, 1.75+ recommended) with `cargo`
- [Node.js](https://nodejs.org/) 18+ and `npm`
- Git

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

Clone the repo and set up each half of the stack independently — the backend and frontend run as separate processes during development.

```bash
git clone https://github.com/leachj/test.git
cd test
```

### 🦀 Backend

```bash
cd backend
cargo run              # Start dev server on http://localhost:3001
cargo build --release  # Production build
cargo test             # Run tests
cargo clippy           # Lint
cargo fmt              # Format
```

The backend keeps all tasks in memory, so data resets whenever the server restarts. By default it listens on port `3001`; override this with the `PORT` environment variable, e.g. `PORT=4000 cargo run`.

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

Once both servers are running, open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

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

Tasks returned by the API look like this:

```json
{
  "id": "b3b3e2b0-9b8e-4c9a-9b0e-2b8e9b8e9b8e",
  "title": "Write documentation",
  "description": "Expand the README with more detail",
  "completed": false,
  "createdAt": "2024-01-01T12:00:00Z"
}
```

`title` and `description` are optional on creation; `completed` defaults to `false`.

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 🤝 Contributing

1. Create a feature branch off `main`
2. Make your changes, keeping backend and frontend code idiomatic to their respective ecosystems
3. Run the relevant checks locally before opening a PR:
   - Backend: `cargo fmt`, `cargo clippy`, `cargo test`
   - Frontend: `npm run lint`, `npm test`
4. Open a pull request — CI must pass before merging

## 📄 License

This project is licensed under the terms of the [LICENSE](LICENSE) file in this repository.
