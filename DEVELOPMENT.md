# 🛠️ Local Development Setup

This guide walks through setting up the Task Manager project for local development.

## ✅ Prerequisites

- 🦀 [Rust](https://www.rust-lang.org/tools/install) (stable toolchain, includes `cargo`)
- ⚛️ [Node.js](https://nodejs.org/) 18+ and `npm`
- 🐙 Git

## 🦀 Backend Setup

```bash
cd backend
cargo run           # Start dev server on http://localhost:3001
```

Other useful commands:

```bash
cargo build --release  # Production build
cargo test             # Run tests
cargo clippy           # Lint
cargo fmt              # Format code
```

The backend exposes a REST API under `/api` and a `/health` endpoint. See the
[API Endpoints](README.md#-api-endpoints) section of the README for details.

## ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm run dev        # Start Vite dev server on http://localhost:3000
```

Other useful commands:

```bash
npm run build      # Production build → dist/
npm test           # Run Vitest tests
npm run lint       # ESLint
```

> 💡 The frontend dev server proxies `/api` requests to the backend at
> `http://localhost:3001`, so run both servers side by side while developing.

## 🔄 Typical Workflow

1. Start the backend: `cd backend && cargo run`
2. In a second terminal, start the frontend: `cd frontend && npm run dev`
3. Open `http://localhost:3000` in your browser
4. Make changes — both dev servers support hot reloading

## ⚙️ Running CI Checks Locally

Before opening a pull request, run the same checks CI runs:

```bash
# Backend
cd backend && cargo fmt --check && cargo clippy && cargo test

# Frontend
cd frontend && npm run lint && npm test && npm run build
```

See [`README.md`](README.md) for a project overview and architecture diagrams.
