# 📋 Task Manager

A full-stack task management application built with **React** (frontend) and **Express** (backend), both written in TypeScript.

## Features

- Create, view, update, and delete tasks
- Mark tasks as complete
- Persistent in-memory task store via a REST API
- Proxy-based local dev setup — no CORS configuration needed

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 18, TypeScript, Vite, Vitest      |
| Backend  | Node.js, Express, TypeScript, Jest      |
| CI       | GitHub Actions (lint → build → test)    |

## Project Structure

```
.
├── backend/              # Express REST API
│   ├── src/
│   │   ├── app.ts        # Express app setup
│   │   ├── index.ts      # Server entry point
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # TypeScript interfaces (Task, DTOs)
│   │   └── routes/       # Route handlers
│   └── tests/
├── frontend/             # React UI
│   └── src/
│       ├── api/          # API client functions
│       ├── components/   # TaskForm, TaskItem, TaskList
│       ├── hooks/        # Custom React hooks
│       └── App.tsx
└── .github/workflows/
    ├── backend.yml
    └── frontend.yml
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

> The frontend dev server proxies all `/api` requests to the backend at `http://localhost:3001`, so no extra CORS setup is required.

Open **http://localhost:3000** in your browser.

## Available Scripts

### Backend (`/backend`)

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Start dev server with `ts-node`    |
| `npm run build` | Compile TypeScript → `dist/`       |
| `npm start`     | Run compiled output from `dist/`   |
| `npm test`      | Run Jest tests                     |
| `npm run lint`  | Lint with ESLint                   |

### Frontend (`/frontend`)

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run dev`        | Start Vite dev server              |
| `npm run build`      | Production build → `dist/`         |
| `npm run preview`    | Preview production build           |
| `npm test`           | Run Vitest tests (single run)      |
| `npm run test:watch` | Run Vitest in watch mode           |
| `npm run lint`       | Lint with ESLint                   |

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

### Create / update payloads

**POST `/api/tasks`**
```json
{ "title": "Buy milk", "description": "Optional details" }
```

**PATCH `/api/tasks/:id`**
```json
{ "title": "...", "description": "...", "completed": true }
```
All fields are optional.

## CI / GitHub Actions

Two workflows run automatically on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — lint → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## License

[MIT](LICENSE)
