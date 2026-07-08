# Task Manager

A full-stack TypeScript application for managing tasks, with a React + Vite frontend and a Node.js + Express backend.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, TypeScript, Vite          |
| Backend  | Node.js, Express, TypeScript        |
| Testing  | Vitest + Testing Library (frontend), Jest + Supertest (backend) |
| Linting  | ESLint with TypeScript plugin       |
| CI       | GitHub Actions                      |

## Project Structure

```
.
├── backend/              # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── app.ts        # Express app setup
│   │   ├── index.ts      # Server entry point
│   │   ├── middleware/   # Error handling middleware
│   │   ├── models/       # TypeScript interfaces (Task, DTOs)
│   │   └── routes/       # Route handlers
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

- **Node.js** v18 or later
- **npm** v9 or later

## Getting Started

Install dependencies and start each service in a separate terminal.

### Backend

```bash
cd backend
npm install
npm run dev        # Start dev server on http://localhost:3001
npm run build      # Compile TypeScript → dist/
npm start          # Run compiled output
npm test           # Run Jest tests
npm run lint       # ESLint
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`, so both services need to be running during development.

## Data Model

```ts
interface Task {
  id: string;          // UUID
  title: string;       // Required
  description: string; // Optional, defaults to ""
  completed: boolean;  // Defaults to false
  createdAt: string;   // ISO 8601 timestamp
}
```

## API Reference

All endpoints are served from `http://localhost:3001`.

| Method   | Path              | Description              | Request Body                                      |
|----------|-------------------|--------------------------|---------------------------------------------------|
| `GET`    | `/health`         | Health check             | —                                                 |
| `GET`    | `/api/tasks`      | List all tasks           | —                                                 |
| `POST`   | `/api/tasks`      | Create a task            | `{ title: string, description?: string }`         |
| `GET`    | `/api/tasks/:id`  | Get a single task        | —                                                 |
| `PATCH`  | `/api/tasks/:id`  | Update a task            | `{ title?: string, description?: string, completed?: boolean }` |
| `DELETE` | `/api/tasks/:id`  | Delete a task            | —                                                 |

Tasks are stored in memory and are reset when the server restarts.

## CI / GitHub Actions

Two workflows run automatically on every push and pull request targeting `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

This project is licensed under the [Apache License 2.0](LICENSE).
