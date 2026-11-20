/**
 * routes/notification.routes.js — /api/notifications.
 *
 * Connects to: middlewares/auth.js, middlewares/validate.js,
 * validators/common.validator.js, controllers/notification.controller.js.
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { idParams, paginationQuery } from "../validators/common.validator.js";
import * as notifications from "../controllers/notification.controller.js";

const router = Router();

router.use(requireUser);

// TODO:
//   GET   /             → validate({ query: paginationQuery }), notifications.listNotifications
//   PATCH /read-all     → notifications.markAllRead          ← BEFORE "/:id/read"
//   PATCH /:id/read     → validate({ params: idParams }), notifications.markRead

export default router;
