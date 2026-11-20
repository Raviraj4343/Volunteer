/**
 * routes/report.routes.js — /api/reports.
 *
 * Connects to: middlewares/auth.js, middlewares/validate.js, middlewares/rateLimiter.js,
 * validators/report.validator.js, controllers/report.controller.js.
 * Frontend already calls: POST /reports (ReportDialog.jsx)
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { reportLimiter } from "../middlewares/rateLimiter.js";
import { createReportBody } from "../validators/report.validator.js";
import * as reports from "../controllers/report.controller.js";

const router = Router();

router.use(requireUser);

// TODO:
//   POST /   → reportLimiter, validate({ body: createReportBody }), reports.createReport

export default router;
