# Task Manager

A full-stack TypeScript task management app — React + Vite on the frontend, Node.js + Express on the backend.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete / incomplete
- Persistent in-memory store (easily swappable for a database)
- Type-safe end-to-end with TypeScript
- Fully tested frontend (Vitest + React Testing Library) and backend (Jest + Supertest)

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, TypeScript, Vite |
| Backend  | Node.js, Express, TypeScript |
| Testing  | Vitest / Jest, React Testing Library, Supertest |
| CI       | GitHub Actions |

## Project Structure

```
.
├── backend/             # Express REST API
│   └── src/
│       ├── models/      # Task types & DTOs
│       ├── routes/      # /api/tasks route handlers
│       ├── middleware/  # Error handling
│       └── index.ts     # Server entry point
├── frontend/            # React UI
│   └── src/
│       ├── api/         # Typed fetch wrappers
│       ├── components/  # TaskForm, TaskItem, TaskList
│       ├── hooks/       # useTasks custom hook
│       └── App.tsx
└── .github/
    └── workflows/
        ├── backend.yml  # CI: lint → build → test
        └── frontend.yml # CI: lint → build → test
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

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
npm run dev        # http://localhost:5173
```

The frontend dev server automatically proxies `/api` requests to the backend.

## Available Scripts

### Backend (`cd backend`)

| Script          | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start dev server with ts-node      |
| `npm run build` | Compile TypeScript → `dist/`       |
| `npm start`     | Run compiled output from `dist/`   |
| `npm test`      | Run Jest tests                     |
| `npm run lint`  | Lint with ESLint                   |

### Frontend (`cd frontend`)

| Script               | Description                        |
|----------------------|------------------------------------|
| `npm run dev`        | Start Vite dev server              |
| `npm run build`      | Type-check + production build      |
| `npm run preview`    | Preview the production build       |
| `npm test`           | Run Vitest (single run)            |
| `npm run test:watch` | Run Vitest in watch mode           |
| `npm run lint`       | Lint with ESLint                   |

## API Reference

Base URL: `http://localhost:3001`

| Method   | Path              | Description          |
|----------|-------------------|----------------------|
| `GET`    | `/health`         | Health check         |
| `GET`    | `/api/tasks`      | List all tasks       |
| `POST`   | `/api/tasks`      | Create a task        |
| `GET`    | `/api/tasks/:id`  | Get a task by ID     |
| `PATCH`  | `/api/tasks/:id`  | Update a task        |
| `DELETE` | `/api/tasks/:id`  | Delete a task        |

### Task object

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "ISO 8601 timestamp"
}
```

### Create / update payloads

**POST** `/api/tasks`
```json
{ "title": "Buy groceries", "description": "Optional details" }
```

**PATCH** `/api/tasks/:id`
```json
{ "title": "Updated title", "description": "Updated details", "completed": true }
```

## CI / GitHub Actions

Two workflows run on every push and pull request targeting `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

[MIT](LICENSE)
