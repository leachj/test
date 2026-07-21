# Task Manager

A full-stack application with a React (TypeScript) frontend and a C++ (cpp-httplib) backend.

## Project Structure

```
.
├── backend/    # C++ REST API (cpp-httplib + nlohmann/json, built with CMake)
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: configure, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## Getting Started

### Backend

Requires CMake (>= 3.16) and a C++17 compiler.

```bash
cd backend
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release  # Configure
cmake --build build --parallel                  # Build (produces build/backend)
./build/backend                                 # Start dev server on http://localhost:3001
ctest --test-dir build --output-on-failure       # Run tests
```

Set the `PORT` environment variable to override the default port 3001.

### Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
npm run build      # Production build → dist/
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`.

## API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

## CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- **Backend CI** (`.github/workflows/backend.yml`) — configure → build → test
- **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test
