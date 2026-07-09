# Task Manager

[![Backend CI](https://github.com/leachj/test/actions/workflows/backend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/leachj/test/actions/workflows/frontend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/frontend.yml)

A full-stack TypeScript application for managing tasks, featuring a React + Vite frontend and a Node.js + Express REST API backend.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete or incomplete
- Optional task descriptions
- Live API proxy from the frontend dev server to the backend
- Full CI pipeline with lint, build, and test on every push and pull request

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest  |
| Backend  | Node.js 20, Express 4, TypeScript   |
| Testing  | Jest (backend), Vitest (frontend), Testing Library |
| Linting  | ESLint with TypeScript rules        |
| CI       | GitHub Actions                      |

## Project Structure

```
.
├── backend/              # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── models/       # TypeScript interfaces (Task, DTOs)
│   │   ├── routes/       # Express route handlers
│   │   ├── middleware/   # Error handling middleware
│   │   ├── app.ts        # Express app setup
│   │   └── index.ts      # Server entry point
│   └── tests/            # Jest integration tests
├── frontend/             # React + TypeScript + Vite UI
│   └── src/
│       ├── api/          # API client functions
│       ├── components/   # React components
│       └── hooks/        # Custom React hooks
└── .github/
    └── workflows/
        ├── backend.yml   # CI: lint, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm v9 or later (bundled with Node.js)

## Getting Started

### 1. Start the backend

```bash
cd backend
npm install
npm run dev        # Starts the API server on http://localhost:3001
```

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev        # Starts the Vite dev server on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The frontend dev server automatically proxies `/api` requests to the backend.

## Available Scripts

### Backend (`backend/`)

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start dev server with `ts-node`      |
| `npm run build` | Compile TypeScript → `dist/`         |
| `npm start`     | Run compiled output from `dist/`     |
| `npm test`      | Run Jest tests                       |
| `npm run lint`  | Lint with ESLint                     |

### Frontend (`frontend/`)

| Script             | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Start Vite dev server                |
| `npm run build`    | Production build → `dist/`           |
| `npm run preview`  | Preview the production build locally |
| `npm test`         | Run Vitest tests (single run)        |
| `npm run test:watch` | Run Vitest in watch mode           |
| `npm run lint`     | Lint with ESLint                     |

## Data Model

### Task

```ts
interface Task {
  id: string;          // UUID v4
  title: string;       // Required
  description: string; // Optional, defaults to ""
  completed: boolean;  // Defaults to false
  createdAt: string;   // ISO 8601 timestamp
}
```

## API Reference

Base URL: `http://localhost:3001`

### Health check

```
GET /health
```

Response `200`:
```json
{ "status": "ok" }
```

---

### List all tasks

```
GET /api/tasks
```

Response `200`: array of [Task](#task) objects.

---

### Create a task

```
POST /api/tasks
Content-Type: application/json
```

Request body:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

- `title` (string, **required**)
- `description` (string, optional)

Response `201`: the created [Task](#task).

---

### Get a single task

```
GET /api/tasks/:id
```

Response `200`: the [Task](#task).
Response `404` if not found.

---

### Update a task

```
PATCH /api/tasks/:id
Content-Type: application/json
```

Request body (all fields optional):
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "completed": true
}
```

Response `200`: the updated [Task](#task).
Response `404` if not found.

---

### Delete a task

```
DELETE /api/tasks/:id
```

Response `204` (no content) on success.
Response `404` if not found.

---

## CI / GitHub Actions

Two workflows trigger on pushes and pull requests to `main` when their respective paths change:

| Workflow | File | Steps |
|----------|------|-------|
| **Backend CI** | `.github/workflows/backend.yml` | lint → build → test (with coverage) |
| **Frontend CI** | `.github/workflows/frontend.yml` | lint → build → test |
