# Task Manager

A full-stack TypeScript task manager with a React frontend and an Express backend.

## What it includes

- Create, view, update, and delete tasks
- Frontend UI built with React + Vite
- Backend REST API built with Express
- Separate CI workflows for frontend and backend

## Project structure

```
.
├── backend/    # Node.js + Express + TypeScript REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: lint, build, test
        └── frontend.yml  # CI: lint, build, test
```

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

## Quick start

Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Run the app in two terminals:

```bash
# Terminal 1: backend API
cd backend
npm run dev
```

```bash
# Terminal 2: frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Frontend proxies `/api` requests to `http://localhost:3001`

## Package scripts

### Backend (`/backend`)

- `npm run dev` — start API in development mode
- `npm run build` — compile TypeScript to `dist/`
- `npm run start` — run compiled backend from `dist/`
- `npm run test` — run Jest tests
- `npm run lint` — run ESLint

### Frontend (`/frontend`)

- `npm run dev` — start Vite dev server
- `npm run build` — create production bundle
- `npm run preview` — preview production build locally
- `npm run test` — run Vitest tests
- `npm run lint` — run ESLint

## API endpoints

| Method | Path             | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/health`        | Health check      |
| GET    | `/api/tasks`     | List all tasks    |
| POST   | `/api/tasks`     | Create a task     |
| GET    | `/api/tasks/:id` | Get a single task |
| PATCH  | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

Example `POST /api/tasks` body:

```json
{
  "title": "Write better README",
  "description": "Document setup and usage"
}
```

> Task data is stored in memory and is reset when the backend process restarts.

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
