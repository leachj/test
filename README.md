# Task Manager

A full-stack TypeScript application for managing tasks, with a React frontend and an Express REST API backend.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete or incomplete
- Responsive single-page UI built with React
- RESTful JSON API with input validation and error handling

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, TypeScript, Vite              |
| Backend  | Node.js, Express, TypeScript            |
| Testing  | Vitest (frontend), Jest + Supertest (backend) |
| Linting  | ESLint + TypeScript ESLint              |
| CI       | GitHub Actions                          |

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

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

## Getting Started

Run the backend and frontend in separate terminals.

### 1. Backend

```bash
cd backend
npm install
npm run dev        # Start dev server on http://localhost:3001
```

Other backend commands:

```bash
npm run build      # Compile TypeScript → dist/
npm start          # Run compiled output (requires build first)
npm test           # Run Jest tests
npm run lint       # ESLint
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
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`, so both services must be running for the UI to work.

## API Reference

### Health Check

| Method | Path      | Description  |
|--------|-----------|--------------|
| GET    | `/health` | Health check |

### Tasks

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

#### Task object

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### `POST /api/tasks` — request body

```json
{
  "title": "Buy groceries",      // required
  "description": "Milk, eggs"    // optional
}
```

#### `PATCH /api/tasks/:id` — request body (all fields optional)

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true
}
```

> **Note:** Task data is stored in memory and will be cleared when the backend process restarts.

## CI / GitHub Actions

Two workflows run on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
