# Task Manager

A full-stack TypeScript application for managing tasks, with a React + Vite frontend and a Node.js + Express backend.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete or incomplete
- RESTful JSON API with full CRUD support
- In-memory data store (no database setup required)
- End-to-end TypeScript across frontend and backend

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest      |
| Backend  | Node.js, Express, TypeScript, Jest      |
| CI       | GitHub Actions                          |

## Project Structure

```
.
├── backend/              # Express REST API
│   └── src/
│       ├── models/       # Task type definitions and DTOs
│       ├── routes/       # API route handlers
│       ├── middleware/   # Error handling middleware
│       └── index.ts      # Entry point
├── frontend/             # React UI
│   └── src/
│       ├── api/          # API client functions
│       ├── components/   # TaskForm, TaskItem, TaskList
│       ├── hooks/        # useTasks custom hook
│       └── main.tsx      # Entry point
└── .github/
    └── workflows/
        ├── backend.yml   # CI: lint, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Start the backend

```bash
cd backend
npm install
npm run dev        # Starts dev server on http://localhost:3001
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev        # Starts Vite dev server on http://localhost:3000
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`, so no CORS configuration is needed during development.

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Backend (`cd backend`)

| Command          | Description                        |
|------------------|------------------------------------|
| `npm run dev`    | Start dev server with ts-node      |
| `npm run build`  | Compile TypeScript → `dist/`       |
| `npm start`      | Run compiled build                 |
| `npm test`       | Run Jest tests                     |
| `npm run lint`   | Lint with ESLint                   |

### Frontend (`cd frontend`)

| Command              | Description                         |
|----------------------|-------------------------------------|
| `npm run dev`        | Start Vite dev server               |
| `npm run build`      | Type-check and build for production |
| `npm run preview`    | Preview the production build        |
| `npm test`           | Run Vitest tests                    |
| `npm run test:watch` | Run Vitest in watch mode            |
| `npm run lint`       | Lint with ESLint                    |

## API Reference

Base URL: `http://localhost:3001`

| Method   | Path              | Description           |
|----------|-------------------|-----------------------|
| `GET`    | `/health`         | Health check          |
| `GET`    | `/api/tasks`      | List all tasks        |
| `POST`   | `/api/tasks`      | Create a task         |
| `GET`    | `/api/tasks/:id`  | Get a task by ID      |
| `PATCH`  | `/api/tasks/:id`  | Update a task         |
| `DELETE` | `/api/tasks/:id`  | Delete a task         |

### Task schema

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "ISO 8601 timestamp"
}
```

### Create / Update request body

```json
// POST /api/tasks
{ "title": "Buy groceries", "description": "Milk, eggs, bread" }

// PATCH /api/tasks/:id  (all fields optional)
{ "title": "Updated title", "completed": true }
```

## CI / GitHub Actions

Two workflows run on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
