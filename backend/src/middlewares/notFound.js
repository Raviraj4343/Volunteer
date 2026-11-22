/**
 * middlewares/notFound.js — catches requests that matched no route.
 *
 * Connects to: utils/ApiError.js. Registered in app.js after all routes,
 * just before errorHandler.
 */
import { ApiError } from "../utils/ApiError.js";

export function notFound(req, res, next) {
  // TODO: throw ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`)
  // HINT: Throwing here sends it to errorHandler, so the response shape 
  // stays consistent.
  throw ApiError.notFound(
    `Route not found: ${req.method} ${req.originalUrl}`
  );
}
