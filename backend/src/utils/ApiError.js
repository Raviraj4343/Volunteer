/**
 * utils/ApiError.js — one error class for every "expected" failure
 * (404 not found, 403 forbidden, 409 conflict, 422 invalid input…).
 *
 * Connects to: thrown from controllers/ and services/; caught by
 * middlewares/errorHandler.js, which turns it into a JSON response.
 * The frontend reads `message` from that response and shows it in a toast,
 * so write messages for humans ("This mission is full"), not for developers.
 */

export class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    this.isOperational =true;

    Error.captureStackTrace?.(this, ApiError);
  }

  // Small factories so callers can write: throw ApiError.notFound("Mission not found")
  static badRequest(message = "Bad request", details) {
    // TODO: return new ApiError(400, message, details)
    return new ApiError(400, message, details);
  }

  static unauthorized(message = "Please sign in to continue.") {
    // TODO: 401
    return new ApiError(401, message);
  }

  static forbidden(message = "You don't have permission to do that.") {
    // TODO: 403
    return new ApiError(403, message);
  }

  static notFound(message = "Not found") {
    // TODO: 404
    return new ApiError(404, message);
  }

  static conflict(message) {
    // TODO: 409 — e.g. "This mission is full", "Already rated"
    return new ApiError(409, message);
  }

  static unprocessable(message = "Some fields are invalid.", details) {
    // TODO: 422 — used by middlewares/validate.js for Zod errors
    return new ApiError(422, message, details);
  }
}
