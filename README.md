# Task Manager

A full-stack TypeScript application with a React frontend and an Express backend for creating and tracking tasks.

## Features

- Create, edit, complete, and delete tasks from a simple web UI
- REST API for task CRUD operations
- TypeScript across frontend and backend
- CI workflows for lint, build, and tests

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

### Prerequisites

- Node.js 18+
- npm 9+

### Run the full app locally

1. Start the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. In a second terminal, start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Then open `http://localhost:3000`.

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

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`.
>
> Tasks are stored in memory, so restarting the backend resets all task data.

## API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

Example:

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write docs","description":"Improve README"}'
```

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
