# Task Manager

A full-stack TypeScript application for managing tasks, with a React + Vite frontend and a Node.js + Express backend.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete or incomplete
- Persistent in-memory storage on the backend (data resets on server restart)
- Frontend proxies API requests to the backend — no CORS config needed in development

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest      |
| Backend  | Node.js, Express 4, TypeScript, Jest    |
| Tooling  | ESLint, ts-node, GitHub Actions CI      |

## Project Structure

```
.
├── backend/              # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── index.ts      # Entry point
│   │   ├── app.ts        # Express app setup
│   │   ├── models/       # TypeScript interfaces (Task, DTOs)
│   │   ├── routes/       # Route handlers (/api/tasks)
│   │   └── middleware/   # Error handling middleware
│   └── tests/            # Jest integration tests
├── frontend/             # React + TypeScript + Vite UI
│   └── src/
│       ├── api/          # API client functions
│       ├── components/   # React components (TaskList, TaskItem, TaskForm)
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

Start the backend and frontend in separate terminals.

### Backend

```bash
cd backend
npm install
npm run dev        # Start dev server on http://localhost:3001
```

Other available commands:

```bash
npm run build      # Compile TypeScript → dist/
npm start          # Run compiled output (requires npm run build first)
npm test           # Run Jest integration tests
npm run lint       # ESLint
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
```

Other available commands:

```bash
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> The frontend dev server automatically proxies `/api` requests to the backend at `http://localhost:3001`, so both servers must be running during development.

## Data Model

A **Task** object has the following shape:

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## API Reference

All task endpoints are prefixed with `/api`.

| Method   | Path              | Description                        | Request body                          |
|----------|-------------------|------------------------------------|---------------------------------------|
| `GET`    | `/health`         | Health check                       | —                                     |
| `GET`    | `/api/tasks`      | List all tasks                     | —                                     |
| `POST`   | `/api/tasks`      | Create a task                      | `{ "title": string, "description?": string }` |
| `GET`    | `/api/tasks/:id`  | Get a single task                  | —                                     |
| `PATCH`  | `/api/tasks/:id`  | Update a task (partial update)     | `{ "title?": string, "description?": string, "completed?": boolean }` |
| `DELETE` | `/api/tasks/:id`  | Delete a task                      | —                                     |

### Response codes

| Code  | Meaning                            |
|-------|------------------------------------|
| `200` | OK                                 |
| `201` | Task created                       |
| `204` | Task deleted (no content)          |
| `400` | Bad request (e.g. missing `title`) |
| `404` | Task not found                     |

## CI / GitHub Actions

Two workflows run automatically on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes with appropriate tests.
3. Ensure `npm run lint`, `npm run build`, and `npm test` all pass in both `backend/` and `frontend/`.
4. Open a pull request against `main`.
