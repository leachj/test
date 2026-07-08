# Task Manager

A full-stack TypeScript application for managing tasks, with a React frontend and an Express REST API backend.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete or incomplete
- Persistent in-memory storage (resets on server restart)
- CORS-enabled REST API ready for use with any HTTP client
- Full TypeScript coverage across both frontend and backend

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest              |
| Backend  | Node.js, Express 4, TypeScript, Jest, Supertest |
| CI       | GitHub Actions                                  |

## Prerequisites

- **Node.js** ≥ 18.x and **npm** ≥ 9.x

## Project Structure

```
.
├── backend/    # Node.js + Express + TypeScript REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: lint, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Getting Started

Open **two terminals** and run the backend and frontend concurrently.

### 1. Backend

```bash
cd backend
npm install
npm run dev        # Start dev server on http://localhost:3001
```

Other backend commands:

```bash
npm run build      # Compile TypeScript → dist/
npm start          # Run the compiled build
npm test           # Run Jest tests
npm run lint       # Run ESLint
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
```

Other frontend commands:

```bash
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest tests
npm run lint       # Run ESLint
```

> **Note:** The frontend dev server automatically proxies all `/api` requests to the backend at `http://localhost:3001`, so no CORS issues arise during development.

## API Endpoints

All task endpoints are prefixed with `/api`.

| Method   | Path              | Description          | Request body                                          | Success response       |
|----------|-------------------|----------------------|-------------------------------------------------------|------------------------|
| `GET`    | `/health`         | Health check         | —                                                     | `200 { "status": "ok" }` |
| `GET`    | `/api/tasks`      | List all tasks       | —                                                     | `200 Task[]`           |
| `POST`   | `/api/tasks`      | Create a task        | `{ "title": "string", "description?": "string" }`    | `201 Task`             |
| `GET`    | `/api/tasks/:id`  | Get a single task    | —                                                     | `200 Task`             |
| `PATCH`  | `/api/tasks/:id`  | Update a task        | `{ "title?": "string", "description?": "string", "completed?": boolean }` | `200 Task` |
| `DELETE` | `/api/tasks/:id`  | Delete a task        | —                                                     | `204 No Content`       |

### Task object

```jsonc
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## CI / GitHub Actions

Two workflows run automatically on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

This project is licensed under the [Apache License 2.0](LICENSE).
