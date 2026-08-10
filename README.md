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

## 🏗️ Architecture

```mermaid
flowchart LR
    User(("👤 User")) --> Browser["React + TypeScript UI\n(frontend)"]
    Browser -->|"HTTP /api/*"| API["Axum REST API\n(backend)"]
    API --> Store[("Task Store")]

    subgraph Frontend [frontend/]
        Browser
    end

    subgraph Backend [backend/]
        API
        Store
    end
```

## 🔄 Request Flow

```mermaid
sequenceDiagram
    actor U as User
    participant FE as React UI
    participant BE as Axum API
    participant DB as Task Store

    U->>FE: Interact (create/update/delete task)
    FE->>BE: HTTP request (/api/tasks)
    BE->>DB: Read/write task data
    DB-->>BE: Result
    BE-->>FE: JSON response
    FE-->>U: Updated task list
```

## 📌 Task Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Created: POST /api/tasks
    Created --> Updated: PATCH /api/tasks/:id
    Updated --> Updated: PATCH /api/tasks/:id
    Created --> Deleted: DELETE /api/tasks/:id
    Updated --> Deleted: DELETE /api/tasks/:id
    Deleted --> [*]
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

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
