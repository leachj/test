# 📋 Task Manager

A full-stack application with a React (TypeScript) frontend and a Rust (Axum) backend.

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

## 😄 Task Manager Humor

- Why did the task stay in the backlog? It had commitment issues.
- The Rust backend borrowed a task. Don't worry—it gave it back before the lifetime ended.
- Why did the React component finish every task? It finally got its priorities straight.
- I marked "stop procrastinating" as complete. The implementation is scheduled for next sprint.

**C++ bonus round:**

- I asked C++ for a simple answer. It gave me three constructors, two templates, and undefined behavior.
- C++ doesn't have garbage collection. It has a proud tradition of taking the trash out manually and forgetting whose turn it is.
- The C++ task said it was finished, but its destructor still had some cleanup to do.

**Python bonus round:**

- Why did the Python task finish early? It had fewer braces holding it back.
- I asked Python to handle an exception. It raised one instead.
- The Python developer brought a ladder to work because the code had too many high-level abstractions.

## 🔌 API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
