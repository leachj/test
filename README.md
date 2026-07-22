# Task Manager

A full-stack application with a React (TypeScript) frontend and a Rust (Axum) backend.

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

## Prerequisites

- **Rust** 1.75+ (2021 edition) with `cargo`
- **Node.js** 18+ and `npm`

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

### Configuration

The backend reads its listen port from an environment variable:

| Variable | Default | Description                        |
|----------|---------|------------------------------------|
| `PORT`   | `3001`  | Port the Axum server listens on    |

Task data is stored in memory and resets whenever the backend process restarts — no database setup is required.

## API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## Contributing

Contributions are welcome! To submit a change:

1. Fork the repo and create a feature branch off `main`.
2. Make your changes, adding or updating tests as needed.
3. Run the relevant checks before opening a PR:
   - Backend: `cargo fmt && cargo clippy && cargo test`
   - Frontend: `npm run lint && npm test`
4. Open a pull request describing what changed and why.

CI must pass on both the backend and frontend workflows before a PR can be merged.

