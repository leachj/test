# Task Manager

A full-stack task management app built with **React** (frontend) and **Express** (backend), both written in TypeScript. Create, complete, and delete tasks through a clean UI backed by a REST API.

## Features

- ✅ Create tasks with a title and optional description
- ✅ Mark tasks as complete / incomplete
- ✅ Delete tasks
- ✅ In-memory store — no database setup required
- ✅ Full TypeScript across the stack
- ✅ CI pipeline with lint, build, and tests for both apps

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, TypeScript, Vite        |
| Backend  | Node.js, Express, TypeScript      |
| Testing  | Vitest (frontend), Jest (backend) |
| Linting  | ESLint                            |

## Project Structure

```
.
├── backend/              # Express REST API
│   └── src/
│       ├── models/       # Task types & in-memory store
│       ├── routes/       # /api/tasks route handlers
│       └── middleware/   # Error handling
├── frontend/             # React UI
│   └── src/
│       ├── api/          # Typed fetch helpers
│       ├── components/   # TaskForm, TaskItem, TaskList
│       └── hooks/        # Data-fetching hooks
└── .github/workflows/    # CI workflows
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Start the backend

```bash
cd backend
npm install
npm run dev        # http://localhost:3001
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

The frontend dev server proxies all `/api` requests to the backend, so both commands are all you need for local development.

## API Reference

Base URL: `http://localhost:3001`

| Method   | Path              | Description             | Body                          |
|----------|-------------------|-------------------------|-------------------------------|
| `GET`    | `/health`         | Health check            | —                             |
| `GET`    | `/api/tasks`      | List all tasks          | —                             |
| `POST`   | `/api/tasks`      | Create a task           | `{ title, description? }`     |
| `GET`    | `/api/tasks/:id`  | Get a single task       | —                             |
| `PATCH`  | `/api/tasks/:id`  | Update title/description/completed | `{ title?, description?, completed? }` |
| `DELETE` | `/api/tasks/:id`  | Delete a task           | —                             |

### Task object

```jsonc
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2026-07-08T12:00:00.000Z"
}
```

## Other Scripts

```bash
# Run tests
cd backend && npm test
cd frontend && npm test

# Lint
cd backend && npm run lint
cd frontend && npm run lint

# Production build
cd backend && npm run build   # Compiles TypeScript → dist/
cd frontend && npm run build  # Vite build → dist/
```

## CI / GitHub Actions

Two workflows run automatically on every push and pull request to `main`:

| Workflow | File | Steps |
|----------|------|-------|
| Backend CI | `.github/workflows/backend.yml` | lint → build → test |
| Frontend CI | `.github/workflows/frontend.yml` | lint → build → test |
