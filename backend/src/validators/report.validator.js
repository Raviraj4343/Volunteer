/**
 * validators/report.validator.js — rules for reporting content.
 *
 * Connects to: routes/report.routes.js, config/constants.js.
 * Frontend sends: { targetType, targetId, reason, details }
 *   (frontend/src/features/safety/ReportDialog.jsx)
 */
import { z } from "zod";
import { REPORT_TARGETS, REPORT_REASONS } from "../config/constants.js";
import { objectId } from "./common.validator.js";

// POST /reports
export const createReportBody = z.object({
  // TODO:
  //   targetType: z.enum(REPORT_TARGETS)
  //   targetId:   objectId
  //   reason:     z.enum(REPORT_REASONS)
  //   details:    string, trim, max 500, optional
});
