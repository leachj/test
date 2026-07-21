# Task Manager

A full-stack application with a React (TypeScript) frontend and an Express (TypeScript) backend.

## Project Structure

```
.
├── backend/    # Node.js + Express + TypeScript REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: format, lint, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev          # Start dev server (tsx watch) on http://localhost:3001
npm run build         # Compile TypeScript → dist/
npm start            # Run compiled server
npm test             # Run Vitest tests
npm run lint         # ESLint
npm run format       # Prettier check
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

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — format → lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
