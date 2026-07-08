# Task Manager

A full-stack task management application built with **React** (frontend) and **Express** (backend), both written in TypeScript.

## Tech Stack

| Layer    | Technologies |
|----------|-------------|
| Frontend | React 18, TypeScript, Vite, Vitest, React Testing Library |
| Backend  | Node.js, Express, TypeScript, Jest, Supertest |
| CI       | GitHub Actions |

## Project Structure

```
.
├── backend/              # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── models/       # Data models
│   │   ├── routes/       # API route handlers
│   │   └── middleware/   # Express middleware
│   └── tests/            # Jest integration tests
├── frontend/             # React + TypeScript + Vite UI
│   └── src/
│       ├── api/          # API client layer
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

### 1. Start the backend

```bash
cd backend
npm install
npm run dev        # Starts the API server at http://localhost:3001
```

### 2. Start the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev        # Starts the Vite dev server at http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The frontend dev server automatically proxies `/api` requests to the backend at `http://localhost:3001`.

## Available Scripts

### Backend (`cd backend`)

| Command         | Description                         |
|-----------------|-------------------------------------|
| `npm run dev`   | Start development server (ts-node)  |
| `npm run build` | Compile TypeScript → `dist/`        |
| `npm start`     | Run compiled production build       |
| `npm test`      | Run Jest tests                      |
| `npm run lint`  | Lint with ESLint                    |

### Frontend (`cd frontend`)

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev`        | Start Vite dev server                |
| `npm run build`      | Production build → `dist/`           |
| `npm run preview`    | Preview the production build locally |
| `npm test`           | Run Vitest tests (single run)        |
| `npm run test:watch` | Run Vitest in watch mode             |
| `npm run lint`       | Lint with ESLint                     |

## API Reference

Base URL: `http://localhost:3001`

| Method   | Path              | Description        |
|----------|-------------------|--------------------|
| `GET`    | `/health`         | Health check       |
| `GET`    | `/api/tasks`      | List all tasks     |
| `POST`   | `/api/tasks`      | Create a task      |
| `GET`    | `/api/tasks/:id`  | Get a single task  |
| `PATCH`  | `/api/tasks/:id`  | Update a task      |
| `DELETE` | `/api/tasks/:id`  | Delete a task      |

## CI / GitHub Actions

Two workflows run automatically on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

[MIT](LICENSE)
