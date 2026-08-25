from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.errors import AppError, app_error_handler
from app.routes.tasks import router as tasks_router
from app.state import AppState


def create_app() -> FastAPI:
    app = FastAPI(title="Task Manager API")
    app.state.app_state = AppState()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_exception_handler(AppError, app_error_handler)

    @app.get("/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    app.include_router(tasks_router, prefix="/api/tasks")

    return app


app = create_app()
