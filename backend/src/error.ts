import type { NextFunction, Request, Response } from "express";

/**
 * Mirrors the previous Rust `AppError`: an error with an HTTP status code
 * and a message, serialized as `{ error: { message, statusCode } }`.
 */
export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  static notFound(message: string): AppError {
    return new AppError(404, message);
  }

  static badRequest(message: string): AppError {
    return new AppError(400, message);
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Internal server error";

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
}
