# Task Manager

A full-stack TypeScript application with a React frontend and an Express backend.

## What it does

- Create, update, and delete tasks from a simple web UI
- Persist task state through a REST API
- Provide health and task-management endpoints for integration/testing

## Prerequisites

- Node.js 18+
- npm 9+

## Quick Start (run full app locally)

Install dependencies for both apps:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Start the backend and frontend in separate terminals:

```bash
# Terminal 1
cd backend
npm run dev
```

```bash
# Terminal 2
cd frontend
npm run dev
```

Then open:

- Frontend: http://localhost:3000
- Backend health check: http://localhost:3001/health

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

## Commands

### Backend

```bash
cd backend
npm run dev        # Start dev server on http://localhost:3001
npm run build      # Compile TypeScript → dist/
npm test           # Run Jest tests
npm run lint       # ESLint
```

### Frontend

```bash
cd frontend
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

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
