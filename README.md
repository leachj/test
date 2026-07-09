# Task Manager

[![Backend CI](https://github.com/leachj/test/actions/workflows/backend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/leachj/test/actions/workflows/frontend.yml/badge.svg)](https://github.com/leachj/test/actions/workflows/frontend.yml)

A full-stack TypeScript application for managing tasks, with a React frontend and an Express REST API backend.

## Features

- 📋 Create, view, update, and delete tasks
- ✅ Mark tasks as complete or incomplete
- ⚡ Fast in-browser UI built with React + Vite
- 🔌 RESTful JSON API powered by Node.js + Express
- 🧪 Unit and integration tests for both frontend and backend
- 🚀 CI via GitHub Actions (lint → build → test on every push and PR)

## Project Structure

```
.
├── backend/    # Node.js + Express + TypeScript REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: lint, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Prerequisites

- **Node.js 20** or later
- **npm 9** or later (bundled with Node.js 20)

## Getting Started

### 1. Start the backend

```bash
cd backend
npm install
npm run dev        # Dev server on http://localhost:3001 (ts-node, auto-reloads)
```

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev        # Vite dev server on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The frontend proxies all `/api` requests to the backend automatically.

### Other useful commands

| Command           | Backend                          | Frontend                          |
|-------------------|----------------------------------|-----------------------------------|
| `npm run build`   | Compile TypeScript → `dist/`     | Production build → `dist/`        |
| `npm start`       | Run compiled build (`dist/`)     | —                                 |
| `npm test`        | Run Jest tests                   | Run Vitest tests                  |
| `npm run lint`    | ESLint (`src/` and `tests/`)     | ESLint (`src/`)                   |

## Task Data Model

Each task object has the following fields:

| Field         | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| `id`          | `string`  | UUID, auto-generated on creation         |
| `title`       | `string`  | Short task title (required)              |
| `description` | `string`  | Optional longer description              |
| `completed`   | `boolean` | Whether the task is done (default `false`) |
| `createdAt`   | `string`  | ISO 8601 timestamp set on creation       |

## API Endpoints

Base URL: `http://localhost:3001`

| Method   | Path              | Description        | Request body                              | Success response         |
|----------|-------------------|--------------------|-------------------------------------------|--------------------------|
| `GET`    | `/health`         | Health check       | —                                         | `200 { status: "ok" }`  |
| `GET`    | `/api/tasks`      | List all tasks     | —                                         | `200 Task[]`             |
| `POST`   | `/api/tasks`      | Create a task      | `{ title: string, description?: string }` | `201 Task`               |
| `GET`    | `/api/tasks/:id`  | Get a single task  | —                                         | `200 Task`               |
| `PATCH`  | `/api/tasks/:id`  | Update a task      | `{ title?, description?, completed? }`    | `200 Task`               |
| `DELETE` | `/api/tasks/:id`  | Delete a task      | —                                         | `204 No Content`         |

> **Note:** Tasks are stored in memory and are reset when the backend process restarts.

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test (with coverage)
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes, ensuring all tests pass (`npm test`) and the linter is clean (`npm run lint`) in both `backend/` and `frontend/`.
3. Open a pull request against `main` — CI will run automatically.
