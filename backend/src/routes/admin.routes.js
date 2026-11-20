/**
 * routes/admin.routes.js — /api/admin: moderation. Admins only.
 *
 * Connects to: middlewares/auth.js (requireUser + requireAdmin), middlewares/validate.js,
 * validators/admin.validator.js, validators/common.validator.js,
 * controllers/admin.controller.js.
 */
import { Router } from "express";
import { requireUser, requireAdmin } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { idParams } from "../validators/common.validator.js";
import { listReportsQuery, resolveReportBody, banUserBody } from "../validators/admin.validator.js";
import * as admin from "../controllers/admin.controller.js";

const router = Router();

// TODO: router.use(requireUser, requireAdmin)  — order matters: who are you → are you allowed

// TODO:
//   GET   /stats                     → admin.getDashboardStats
//   GET   /reports                   → validate({ query: listReportsQuery }), admin.listReports
//   PATCH /reports/:id               → validate({ params: idParams, body: resolveReportBody }), admin.resolveReport
//   PATCH /users/:id/ban             → validate({ params: idParams, body: banUserBody }), admin.setUserBan
//   PATCH /missions/:id/visibility   → validate({ params: idParams }), admin.setMissionVisibility

export default router;
