# 📋 Task Manager

A full-stack task management app built with **React** (frontend) and **Express** (backend), both written in TypeScript.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete/incomplete
- Clean REST API with full CRUD support
- CI pipelines for both frontend and backend

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest  |
| Backend  | Node.js, Express, TypeScript, Jest  |
| CI       | GitHub Actions                      |

## Project Structure

```
.
├── backend/               # Express REST API
│   └── src/
│       ├── models/        # Task types & data model
│       ├── routes/        # API route handlers
│       └── middleware/    # Express middleware
├── frontend/              # React UI
│   └── src/
│       ├── api/           # API client
│       ├── components/    # React components
│       └── hooks/         # Custom hooks
└── .github/workflows/     # CI pipelines
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

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

> The frontend proxies `/api` requests to the backend automatically — no extra configuration needed.

## API Reference

Base URL: `http://localhost:3001`

| Method   | Path              | Description       |
|----------|-------------------|-------------------|
| `GET`    | `/health`         | Health check      |
| `GET`    | `/api/tasks`      | List all tasks    |
| `POST`   | `/api/tasks`      | Create a task     |
| `GET`    | `/api/tasks/:id`  | Get a task        |
| `PATCH`  | `/api/tasks/:id`  | Update a task     |
| `DELETE` | `/api/tasks/:id`  | Delete a task     |

### Task Schema

```ts
{
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;  // ISO 8601
}
```

### Example: Create a task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk", "description": "Semi-skimmed"}'
```

## Available Scripts

### Backend (`cd backend`)

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start dev server with ts-node      |
| `npm run build` | Compile TypeScript → `dist/`       |
| `npm start`     | Run compiled production build      |
| `npm test`      | Run Jest tests                     |
| `npm run lint`  | Lint with ESLint                   |

### Frontend (`cd frontend`)

| Command            | Description                     |
|--------------------|---------------------------------|
| `npm run dev`      | Start Vite dev server           |
| `npm run build`    | Production build → `dist/`      |
| `npm run preview`  | Preview production build        |
| `npm test`         | Run Vitest tests                |
| `npm run lint`     | Lint with ESLint                |

## CI / GitHub Actions

Two workflows run on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
