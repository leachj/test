# Task Manager

A full-stack task management application built with React on the frontend and Express on the backend, both written in TypeScript.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Vitest, Testing Library |
| Backend | Node.js, Express, TypeScript, Jest, Supertest |
| CI | GitHub Actions |

## Project Structure

```
.
├── backend/               # Node.js + Express + TypeScript REST API
│   ├── src/               # Application source
│   └── tests/             # Jest test suites
├── frontend/              # React + TypeScript + Vite UI
│   └── src/               # Application source
└── .github/
    └── workflows/
        ├── backend.yml    # CI: lint → build → test
        └── frontend.yml   # CI: lint → build → test
```

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

## Getting Started

### 1. Start the backend

```bash
cd backend
npm install
npm run dev        # Dev server with ts-node → http://localhost:3001
```

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev        # Vite dev server → http://localhost:3000
```

> The frontend dev server proxies all `/api` requests to the backend at `http://localhost:3001`, so no CORS configuration is needed during development.

### Production build

```bash
# Backend
cd backend && npm run build && npm start   # Serves from dist/

# Frontend
cd frontend && npm run build              # Output in dist/
```

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

## Development

### Running tests

```bash
# Backend (Jest + Supertest)
cd backend && npm test

# Frontend (Vitest + Testing Library)
cd frontend && npm test
```

### Linting

```bash
cd backend  && npm run lint
cd frontend && npm run lint
```

## CI / GitHub Actions

Two workflows run automatically on pushes and pull requests targeting `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
