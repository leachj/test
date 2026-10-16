# 📋 Task Manager

A full-stack application with a React (TypeScript) frontend and a Rust (Axum) backend.

## ✨ Features

- Create, view, update, and delete tasks via a REST API
- React + TypeScript UI backed by Vite for fast dev builds
- Rust (Axum) backend for a fast, memory-safe API layer
- CORS-enabled API ready to be consumed by the bundled frontend or other clients
- CI pipelines that lint, build, and test both the backend and frontend on every push/PR

## 🧰 Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain, includes `cargo`)
- [Node.js](https://nodejs.org/) 18+ and `npm`

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

| Variable | Default | Description                             |
|----------|---------|------------------------------------------|
| `PORT`   | `3001`  | Port the backend HTTP server listens on |

Set it inline when starting the server, e.g. `PORT=4000 cargo run`.

## 🔌 API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

### 📝 Task Model

A task returned by the API has the following shape:

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Example: create a task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write the README", "description": "Add more detail"}'
```

`title` and `description` are optional on create; omitted fields default to empty strings. `PATCH` accepts any subset of `title`, `description`, and `completed`.

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 🤝 Contributing

Contributions are welcome! To propose a change:

1. Fork the repo and create a feature branch
2. Make your changes, following the existing code style (`cargo fmt` / `cargo clippy` for the backend, `npm run lint` for the frontend)
3. Add or update tests as needed (`cargo test`, `npm test`)
4. Open a pull request describing the change

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE).
