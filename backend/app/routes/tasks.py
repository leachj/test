from __future__ import annotations

import uuid
from datetime import UTC, datetime

from fastapi import APIRouter, Request, Response, status

from app.errors import AppError
from app.models import CreateTaskDto, Task, UpdateTaskDto
from app.state import AppState

router = APIRouter()


def get_state(request: Request) -> AppState:
    return request.app.state.app_state


@router.get("", response_model=list[Task])
def list_tasks(request: Request) -> list[Task]:
    state = get_state(request)
    return list(state.tasks.values())


@router.get("/{task_id}", response_model=Task)
def get_task(task_id: str, request: Request) -> Task:
    state = get_state(request)
    task = state.tasks.get(task_id)
    if task is None:
        raise AppError.not_found("Task not found")
    return task


@router.post("", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(body: CreateTaskDto, request: Request) -> Task:
    state = get_state(request)
    title = (body.title or "").strip()
    if not title:
        raise AppError.bad_request("Title is required")

    task = Task(
        id=str(uuid.uuid4()),
        title=title,
        description=(body.description or "").strip(),
        completed=False,
        createdAt=datetime.now(UTC).isoformat(),
    )
    state.tasks[task.id] = task
    return task


@router.patch("/{task_id}", response_model=Task)
def update_task(task_id: str, body: UpdateTaskDto, request: Request) -> Task:
    state = get_state(request)
    existing = state.tasks.get(task_id)
    if existing is None:
        raise AppError.not_found("Task not found")

    updated = Task(
        id=existing.id,
        title=body.title.strip() if body.title is not None else existing.title,
        description=(
            body.description.strip() if body.description is not None else existing.description
        ),
        completed=body.completed if body.completed is not None else existing.completed,
        createdAt=existing.created_at,
    )
    state.tasks[updated.id] = updated
    return updated


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str, request: Request) -> Response:
    state = get_state(request)
    if state.tasks.pop(task_id, None) is None:
        raise AppError.not_found("Task not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)
