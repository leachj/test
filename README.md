# Task Manager

[![Backend CI](https://github.com/leachj/test/actions/workflows/backend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/leachj/test/actions/workflows/frontend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/frontend.yml)

A full-stack TypeScript task management application. Create, update, and delete tasks through a React UI backed by an Express REST API.

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest              |
| Backend  | Node.js, Express 4, TypeScript, Jest, Supertest |
| CI       | GitHub Actions                                  |

## Project Structure

```
.
├── backend/              # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── models/       # Task interface & DTOs
│   │   ├── routes/       # Express route handlers
│   │   ├── middleware/   # Error handling middleware
│   │   ├── app.ts        # Express app setup
│   │   └── index.ts      # Entry point
│   └── tests/            # Jest + Supertest integration tests
├── frontend/             # React + TypeScript + Vite UI
│   └── src/
│       ├── api/          # API client functions
│       ├── components/   # TaskForm, TaskItem, TaskList
│       └── hooks/        # Custom React hooks
└── .github/
    └── workflows/
        ├── backend.yml   # CI: lint, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

## Getting Started

Open two terminal windows — one for each service.

### 1. Backend

```bash
cd backend
npm install
npm run dev        # Start dev server on http://localhost:3001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The frontend proxies all `/api` requests to the backend at `http://localhost:3001`.

## Available Scripts

### Backend (`cd backend`)

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start dev server with `ts-node`    |
| `npm run build` | Compile TypeScript → `dist/`       |
| `npm start`     | Run the compiled `dist/index.js`   |
| `npm test`      | Run Jest integration tests         |
| `npm run lint`  | Lint with ESLint                   |

### Frontend (`cd frontend`)

| Command            | Description                        |
|--------------------|------------------------------------|
| `npm run dev`      | Start Vite dev server              |
| `npm run build`    | Production build → `dist/`         |
| `npm run preview`  | Preview the production build       |
| `npm test`         | Run Vitest tests                   |
| `npm run lint`     | Lint with ESLint                   |

## Data Model

### Task

| Field       | Type      | Description                          |
|-------------|-----------|--------------------------------------|
| `id`        | `string`  | UUID generated on creation           |
| `title`     | `string`  | Required. Task title                 |
| `description` | `string` | Optional. Additional details        |
| `completed` | `boolean` | `false` by default                   |
| `createdAt` | `string`  | ISO 8601 timestamp set on creation   |

## API Endpoints

Base URL: `http://localhost:3001`

| Method   | Path              | Description           |
|----------|-------------------|-----------------------|
| `GET`    | `/health`         | Health check          |
| `GET`    | `/api/tasks`      | List all tasks        |
| `POST`   | `/api/tasks`      | Create a task         |
| `GET`    | `/api/tasks/:id`  | Get a single task     |
| `PATCH`  | `/api/tasks/:id`  | Update a task         |
| `DELETE` | `/api/tasks/:id`  | Delete a task         |

### Examples

**Create a task**
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**Mark a task complete**
```bash
curl -X PATCH http://localhost:3001/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a task**
```bash
curl -X DELETE http://localhost:3001/api/tasks/<id>
```

> **Note:** Tasks are stored in memory and will be lost when the backend process restarts.

## CI / GitHub Actions

Two workflows run automatically on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes, adding tests where appropriate.
3. Ensure all checks pass: `npm run lint`, `npm run build`, and `npm test` in both `backend/` and `frontend/`.
4. Open a pull request against `main`.
