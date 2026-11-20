/**
 * utils/apiResponse.js — keeps EVERY response in the same shape:
 *   { success: true,  data: ..., message: "..." }
 *   { success: false, data: null, message: "...", errors?: [...] }
 *
 * Connects to: used by every controller (sendSuccess) and by
 * middlewares/errorHandler.js (sendError). The frontend client
 * (frontend/src/services/api/client.js) unwraps `data` automatically.
 */

export function sendSuccess(res, data = null, { message = "OK", status = 200, meta } = {}) {
  // TODO: res.status(status).json({ success: true, data, message, ...(meta && { meta }) })
  // HINT: `meta` is for pagination info: { page, limit, total, hasMore }.
}

export function sendCreated(res, data, message = "Created") {
  // TODO: reuse sendSuccess with status 201
}

export function sendError(res, { status = 500, message = "Something went wrong.", errors } = {}) {
  // TODO: res.status(status).json({ success: false, data: null, message, ...(errors && { errors }) })
}
