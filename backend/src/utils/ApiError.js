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
    // TODO:
    //   1. super(message)
    //   2. save statusCode, details on `this`
    //   3. this.isOperational = true  — marks it as an expected error (vs a bug)
    // HINT: Search "extend Error class javascript".
  }

  // Small factories so callers can write: throw ApiError.notFound("Mission not found")
  static badRequest(message = "Bad request", details) {
    // TODO: return new ApiError(400, message, details)
  }

  static unauthorized(message = "Please sign in to continue.") {
    // TODO: 401
  }

  static forbidden(message = "You don't have permission to do that.") {
    // TODO: 403
  }

  static notFound(message = "Not found") {
    // TODO: 404
  }

  static conflict(message) {
    // TODO: 409 — e.g. "This mission is full", "Already rated"
  }

  static unprocessable(message = "Some fields are invalid.", details) {
    // TODO: 422 — used by middlewares/validate.js for Zod errors
  }
}
