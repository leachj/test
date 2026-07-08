# Task Manager

A full-stack task management app built with **React** (frontend) and **Express** (backend), both written in TypeScript.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, TypeScript, Vite, Vitest |
| Backend  | Node.js, Express, TypeScript, Jest |
| CI       | GitHub Actions |

## Project Structure

```
.
├── backend/              # Express REST API
│   └── src/
│       ├── models/       # Task type definitions
│       ├── routes/       # API route handlers
│       └── middleware/   # Express middleware
├── frontend/             # React UI
│   └── src/
│       ├── api/          # API client functions
│       ├── components/   # React components
│       └── hooks/        # Custom React hooks
└── .github/workflows/    # CI pipelines
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
npm run dev        # http://localhost:3000
```

> The frontend dev server automatically proxies `/api` requests to the backend at `http://localhost:3001`.

## API Reference

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

### Endpoints

| Method   | Path             | Description       | Body fields                          |
|----------|------------------|-------------------|--------------------------------------|
| `GET`    | `/health`        | Health check      | —                                    |
| `GET`    | `/api/tasks`     | List all tasks    | —                                    |
| `POST`   | `/api/tasks`     | Create a task     | `title` (required), `description`    |
| `GET`    | `/api/tasks/:id` | Get a task        | —                                    |
| `PATCH`  | `/api/tasks/:id` | Update a task     | `title`, `description`, `completed`  |
| `DELETE` | `/api/tasks/:id` | Delete a task     | —                                    |

## Scripts

### Backend (`cd backend`)

| Command         | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Start dev server with ts-node  |
| `npm run build` | Compile TypeScript → `dist/`   |
| `npm start`     | Run compiled production build  |
| `npm test`      | Run Jest tests                 |
| `npm run lint`  | Lint with ESLint               |

### Frontend (`cd frontend`)

| Command              | Description                       |
|----------------------|-----------------------------------|
| `npm run dev`        | Start Vite dev server             |
| `npm run build`      | Production build → `dist/`        |
| `npm run preview`    | Preview production build locally  |
| `npm test`           | Run Vitest tests (single run)     |
| `npm run test:watch` | Run Vitest in watch mode          |
| `npm run lint`       | Lint with ESLint                  |

## CI / GitHub Actions

Two workflows run on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

See [LICENSE](LICENSE).
