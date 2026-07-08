# 📋 Task Manager

A full-stack TypeScript application for managing tasks — create, update, complete, and delete tasks through a clean React UI backed by a REST API.

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Frontend | React 18, TypeScript, Vite, Vitest |
| Backend  | Node.js, Express, TypeScript, Jest |
| CI       | GitHub Actions |

## Project Structure

```
.
├── backend/              # Node.js + Express REST API
│   └── src/
│       ├── models/       # Task interfaces & types
│       ├── routes/       # API route handlers
│       └── middleware/   # Express middleware
├── frontend/             # React + Vite UI
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
npm run dev        # Starts on http://localhost:3001
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:3000
```

The frontend dev server automatically proxies `/api` requests to the backend.

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Available Scripts

### Backend (`cd backend`)

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start dev server with ts-node      |
| `npm run build` | Compile TypeScript → `dist/`       |
| `npm start`     | Run compiled production server     |
| `npm test`      | Run Jest tests                     |
| `npm run lint`  | Lint with ESLint                   |

### Frontend (`cd frontend`)

| Command              | Description                      |
|----------------------|----------------------------------|
| `npm run dev`        | Start Vite dev server            |
| `npm run build`      | Production build → `dist/`       |
| `npm run preview`    | Preview production build locally |
| `npm test`           | Run Vitest tests (single run)    |
| `npm run test:watch` | Run Vitest in watch mode         |
| `npm run lint`       | Lint with ESLint                 |

## API Reference

Base URL: `http://localhost:3001`

| Method   | Path              | Description          |
|----------|-------------------|----------------------|
| `GET`    | `/health`         | Health check         |
| `GET`    | `/api/tasks`      | List all tasks       |
| `POST`   | `/api/tasks`      | Create a task        |
| `GET`    | `/api/tasks/:id`  | Get a single task    |
| `PATCH`  | `/api/tasks/:id`  | Update a task        |
| `DELETE` | `/api/tasks/:id`  | Delete a task        |

### Task schema

```ts
{
  id:          string   // UUID
  title:       string
  description: string
  completed:   boolean
  createdAt:   string   // ISO 8601
}
```

### Example: create a task

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

## CI / GitHub Actions

Two workflows run on every push and pull request to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

[MIT](LICENSE)
