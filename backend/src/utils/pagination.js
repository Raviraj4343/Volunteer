/**
 * utils/pagination.js — turns ?page=2&limit=20 into skip/limit numbers,
 * and builds the `meta` object for responses.
 *
 * Connects to: config/constants.js (PAGINATION), used by services/ that list
 * things (missions, notifications, reports, study matches).
 * Chat history uses CURSOR pagination instead — see services/chat.service.js.
 */
import { PAGINATION } from "../config/constants.js";

export function getPagination(query = {}) {
  // TODO:
  //   1. page  = max(1, Number(query.page) || 1)
  //   2. limit = clamp(Number(query.limit) || DEFAULT_LIMIT, 1, MAX_LIMIT)
  //   3. skip  = (page - 1) * limit
  //   4. return { page, limit, skip }
  // HINT: Always cap `limit` — otherwise someone can request ?limit=1000000.
}

export function buildMeta({ page, limit, total }) {
  // TODO: return { page, limit, total, totalPages: Math.ceil(total / limit), hasMore: page * limit < total }
}
