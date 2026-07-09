# Task Manager

[![Backend CI](https://github.com/leachj/test/actions/workflows/backend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/leachj/test/actions/workflows/frontend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/frontend.yml)

A full-stack TypeScript application for managing tasks, with a React frontend and an Express REST API backend.

## Features

- 📋 Create, view, update, and delete tasks
- ✅ Mark tasks as complete or incomplete
- ⚡ Fast, in-memory task store on the backend
- 🔗 Frontend dev server proxies API requests — no CORS config needed during development

## Tech Stack

| Layer    | Technology                            |
|----------|---------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest    |
| Backend  | Node.js 20, Express 4, TypeScript, Jest |
| CI       | GitHub Actions                        |

## Prerequisites

- **Node.js 20** or later
- **npm** (comes with Node.js)

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

Run the backend and frontend in separate terminal windows.

### Backend

```bash
cd backend
npm install
npm run dev        # Start dev server on http://localhost:3001
npm run build      # Compile TypeScript → dist/
npm test           # Run Jest tests
npm run lint       # ESLint
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

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`, so both servers must be running for the app to work.

## API Endpoints

All task endpoints are prefixed with `/api`.

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

### Task Schema

| Field       | Type    | Description                              |
|-------------|---------|------------------------------------------|
| `id`        | string  | UUID assigned on creation                |
| `title`     | string  | Task title (required)                    |
| `description` | string | Optional detail text                   |
| `completed` | boolean | Whether the task is done (default: false)|
| `createdAt` | string  | ISO 8601 timestamp of creation           |

### Example: Create a Task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

| Workflow | File | Steps |
|----------|------|-------|
| Backend CI | `.github/workflows/backend.yml` | lint → build → test (with coverage) |
| Frontend CI | `.github/workflows/frontend.yml` | lint → build → test |
