/**
 * middlewares/errorHandler.js — the ONE place errors become HTTP responses.
 * Any `throw` (or `next(err)`) anywhere ends up here.
 *
 * Connects to: utils/ApiError.js, utils/apiResponse.js (sendError),
 * config/env.js (hide stack traces in production). Registered LAST in app.js.
 */
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { sendError } from "../utils/apiResponse.js";
import { isProduction } from "../config/env.js";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // TODO: map each kind of error to a status + friendly message:
  //   1. err instanceof ApiError                 → err.statusCode, err.message, err.details
  //   2. err instanceof mongoose.Error.CastError → 400 "Invalid id" (e.g. /missions/abc)
  //   3. err instanceof mongoose.Error.ValidationError → 422 with field messages
  //   4. err.code === 11000 (duplicate key)      → 409 "Already exists"
  //   5. err.type === "entity.too.large"         → 413 (body over the express.json limit)
  //   6. anything else → 500 "Something went wrong." — and console.error(err)
  //      In production NEVER send err.message/stack for 500s (it can leak secrets).
  //   7. finish with sendError(res, { status, message, errors })
  // HINT: Express recognises an error handler ONLY because it has 4 parameters —
  //       keep `next` even if unused. Search: "express error handling middleware".
}
