# 📋 Task Manager

A full-stack task management application with a React (TypeScript) frontend and a Rust (Axum) backend REST API.

## ✨ Features

- Create, view, update, and delete tasks via a REST API
- Health check endpoint for monitoring/liveness probes
- Type-safe frontend built with React + TypeScript + Vite
- CI-enforced formatting, linting, and testing on every push/PR to `main`

## 🧰 Tech Stack

**Backend**
- [Rust](https://www.rust-lang.org/) (edition 2021)
- [Axum](https://github.com/tokio-rs/axum) web framework
- [Tokio](https://tokio.rs/) async runtime
- `serde` / `serde_json` for (de)serialization
- `uuid` for task IDs, `chrono` for timestamps
- `tower-http` for CORS

**Frontend**
- [React 18](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/) for dev server & bundling
- [Vitest](https://vitest.dev/) + Testing Library for tests
- ESLint for linting

## 📋 Prerequisites

- [Rust toolchain](https://rustup.rs/) (stable) with `cargo`
- [Node.js](https://nodejs.org/) 20.x and npm

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

| Variable | Applies to | Default | Description |
|----------|-----------|---------|--------------|
| `PORT`   | Backend   | `3001`  | Port the Axum server listens on |

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

Both workflows are path-filtered, so they only run when files in their respective directory (or the workflow file itself) change.

## 🤝 Contributing

1. Fork/branch from `main`
2. Make your changes, keeping backend and frontend formatting/linting clean:
   - Backend: `cargo fmt && cargo clippy --all-targets -- -D warnings`
   - Frontend: `npm run lint`
3. Ensure tests pass (`cargo test` / `npm test`)
4. Open a pull request against `main` — CI will run automatically

## 📄 License

See [LICENSE](./LICENSE) for details.
