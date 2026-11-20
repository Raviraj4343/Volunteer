/**
 * controllers/notification.controller.js — HTTP layer for in-app notifications.
 *
 * Connects to: services/notification.service.js, utils/apiResponse.js, utils/pagination.js.
 * Used by: routes/notification.routes.js.
 */
import * as notificationService from "../services/notification.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { getPagination } from "../utils/pagination.js";

// GET /api/notifications?page=1
export async function listNotifications(req, res) {
  // TODO: notificationService.listNotifications(req.user._id, getPagination(req.validated.query))
  //       → sendSuccess(res, { items, unreadCount }, { meta })
}

// PATCH /api/notifications/:id/read
export async function markRead(req, res) {
  // TODO: notificationService.markRead(req.user._id, id) → sendSuccess(res, null)
}

// PATCH /api/notifications/read-all
export async function markAllRead(req, res) {
  // TODO: notificationService.markAllRead(req.user._id) → sendSuccess(res, null, { message: "All caught up" })
}
