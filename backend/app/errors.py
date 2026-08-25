"""Mirrors the previous Rust `AppError`: an error with an HTTP status code
and a message, serialized as `{ "error": { "message", "statusCode" } }`.
"""

from __future__ import annotations

from fastapi import Request
from fastapi.responses import JSONResponse


class AppError(Exception):
    def __init__(self, status_code: int, message: str) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.message = message

    @classmethod
    def not_found(cls, message: str) -> AppError:
        return cls(404, message)

    @classmethod
    def bad_request(cls, message: str) -> AppError:
        return cls(400, message)


async def app_error_handler(_request: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"message": exc.message, "statusCode": exc.status_code}},
    )
