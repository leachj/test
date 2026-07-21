/**
 * Mirrors the Rust `AppError` type: an error with an HTTP status code and a
 * message, serialized as `{ error: { message, statusCode } }`.
 */
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }

  static notFound(message: string): AppError {
    return new AppError(404, message);
  }

  static badRequest(message: string): AppError {
    return new AppError(400, message);
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        statusCode: this.statusCode,
      },
    };
  }
}
