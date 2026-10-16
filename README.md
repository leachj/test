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

## 🏗️ Architecture

```mermaid
graph LR
    User(("👤 User"))
    subgraph Frontend["⚛️ Frontend (React + TS + Vite)"]
        UI["UI Components"]
    end
    subgraph Backend["🦀 Backend (Rust + Axum)"]
        API["REST API"]
        Store["Task Store"]
    end

    User --> UI
    UI -- "/api/tasks (fetch, proxied)" --> API
    API --> Store
    Store --> API
    API --> UI
```

## 🧱 Block Diagram

```mermaid
block-beta
columns 3

  Browser["🌐 Browser"]:3

  space:3

  UI["React UI"]:3

  space:3

  Router["Axum Router"] Handlers["Task Handlers"] Store["In-Memory / DB Store"]

  Browser --> UI
  UI --> Router
  Router --> Handlers
  Handlers --> Store
```

## 🔄 Request Flow

```mermaid
sequenceDiagram
    actor U as User
    participant F as Frontend (React)
    participant B as Backend (Axum)

    U->>F: Interacts with UI
    F->>B: HTTP request (e.g. POST /api/tasks)
    B->>B: Validate & process
    B-->>F: JSON response
    F-->>U: Updated UI
```

## 🗃️ Task Entity

```mermaid
erDiagram
    TASK {
        string id PK
        string title
        string description
        boolean completed
        string createdAt
    }
```

## 🔁 Task State Diagram

```mermaid
stateDiagram-v2
    [*] --> Created : POST /api/tasks
    Created --> InProgress : completed = false
    InProgress --> Completed : PATCH completed = true
    Completed --> InProgress : PATCH completed = false
    Created --> Deleted : DELETE /api/tasks/:id
    InProgress --> Deleted : DELETE /api/tasks/:id
    Completed --> Deleted : DELETE /api/tasks/:id
    Deleted --> [*]
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

```mermaid
flowchart TD
    Push["📦 Push / PR to main"] --> Backend & Frontend

    subgraph Backend["🦀 backend.yml"]
        BFmt["cargo fmt --check"] --> BClippy["cargo clippy"] --> BBuild["cargo build"] --> BTest["cargo test"]
    end

    subgraph Frontend["⚛️ frontend.yml"]
        FLint["npm run lint"] --> FBuild["npm run build"] --> FTest["npm test"]
    end

    BTest --> Done["✅ CI Passed"]
    FTest --> Done
```

## 🚢 Deployment Topology

```mermaid
flowchart LR
    subgraph Dev["🧑‍💻 Development"]
        DevBrowser["Browser"] --> Vite["Vite Dev Server :3000"]
        Vite -- "proxy /api" --> Axum1["Axum Server :3001"]
    end

    subgraph Prod["🌐 Production"]
        ProdBrowser["Browser"] --> Static["Static Frontend (CDN / Reverse Proxy)"]
        Static -- "/api requests" --> Axum2["Axum Server"]
    end
```
