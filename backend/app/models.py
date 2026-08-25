from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class Task(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    title: str
    description: str
    completed: bool
    created_at: str = Field(alias="createdAt")


class CreateTaskDto(BaseModel):
    title: str | None = None
    description: str | None = None


class UpdateTaskDto(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None
