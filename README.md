# Task Manager

A full-stack application with a React (TypeScript) frontend and a Rust (Axum) backend.

## Tech Stack

- **Backend:** Rust, [Axum](https://github.com/tokio-rs/axum), Tokio, Serde, UUID, Chrono, Tower-HTTP (CORS)
- **Frontend:** React 18, TypeScript, Vite, Vitest, Testing Library, ESLint

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable toolchain, includes `cargo`)
- [Node.js](https://nodejs.org/) 18+ and npm

## Project Structure

```
.
├── backend/    # Rust + Axum REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: fmt, clippy, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Getting Started

### Backend

```bash
cd backend
cargo run           # Start dev server on http://localhost:3001
cargo build --release  # Production build
cargo test          # Run tests
cargo clippy        # Lint
cargo fmt           # Format
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
npm run build      # Production build → dist/
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`.

## API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

## Data Model

A `Task` has the following shape (returned by the API as JSON):

| Field         | Type      | Description                    |
|---------------|-----------|---------------------------------|
| `id`          | `string`  | UUID assigned on creation      |
| `title`       | `string`  | Task title                     |
| `description` | `string`  | Task description               |
| `completed`   | `boolean` | Whether the task is done       |
| `createdAt`   | `string`  | ISO 8601 creation timestamp    |

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file included in this repository.
