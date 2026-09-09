# 📋 Task Manager

A full-stack application with a React (TypeScript) frontend and a Rust (Axum) backend.

## 🗂️ Project Structure

```
.
├── backend/    # Rust + Axum REST API
├── frontend/   # React + TypeScript + Vite UI
└── .github/
    └── workflows/
        ├── backend.yml   # CI: fmt, clippy, build & test the backend
        └── frontend.yml  # CI: lint, build & test the frontend
```

## 🚀 Getting Started

### 🦀 Backend

```bash
cd backend
cargo run           # Start dev server on http://localhost:3001
cargo build --release  # Production build
cargo test          # Run tests
cargo clippy        # Lint
cargo fmt           # Format
```

### ⚛️ Frontend

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
npm run build      # Production build → dist/
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> The frontend dev server proxies `/api` requests to the backend at `http://localhost:3001`.

## 🔌 API Endpoints

| Method | Path              | Description        |
|--------|-------------------|--------------------|
| GET    | `/health`         | Health check       |
| GET    | `/api/tasks`      | List all tasks     |
| POST   | `/api/tasks`      | Create a task      |
| GET    | `/api/tasks/:id`  | Get a single task  |
| PATCH  | `/api/tasks/:id`  | Update a task      |
| DELETE | `/api/tasks/:id`  | Delete a task      |

## ⚙️ CI / GitHub Actions

Two workflows run on pushes and pull requests to `main`:

- ✅ **Backend CI** (`.github/workflows/backend.yml`) — fmt → clippy → build → test
- ✅ **Frontend CI** (`.github/workflows/frontend.yml`) — lint → build → test

## 🧩 Riddle Break

### 1. Waiting for a Check

I begin as a promise and wait in a row.

The sooner you finish me, the sooner I go. What am I?

<details>
<summary>Show answer</summary>

A task on a to-do list.

</details>

### 2. The Quiet Helper

I answer every caller but never use a voice.

Give me a route, and I return what you requested. What am I?

<details>
<summary>Show answer</summary>

An API.

</details>

### 3. The Tireless Inspector

I wake whenever changes arrive,

checking each one before it can join the crowd. What am I?

<details>
<summary>Show answer</summary>

A CI pipeline.

</details>

### 4. The Leafless Tree

I have branches but no leaves.

Ideas grow on me before they join the trunk. What am I?

<details>
<summary>Show answer</summary>

A Git repository.

</details>

### 5. The Patient Messenger

I carry a question to a distant place,

then return carrying the answer. What am I?

<details>
<summary>Show answer</summary>

An HTTP request-response cycle.

</details>

## 😄 Developer Joke Break

### 1. A Growing Problem

Why did the task manager bring a ladder to work?

<details>
<summary>Show punchline</summary>

The backlog kept getting higher.

</details>

### 2. Dinner Plans

Where did the frontend meet the backend for dinner?

<details>
<summary>Show punchline</summary>

At the API endpoint.

</details>

### 3. Quality Control

Why did the CI pipeline decline the party invitation?

<details>
<summary>Show punchline</summary>

It could not get past the checks.

</details>

### 4. Taking Space

Why did the Git branch take a vacation from `main`?

<details>
<summary>Show punchline</summary>

It needed time to commit to itself.

</details>

### 5. Too Much Traffic

Why did the API start meditating?

<details>
<summary>Show punchline</summary>

It had too many requests to process.

</details>
