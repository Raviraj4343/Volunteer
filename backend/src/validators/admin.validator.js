/**
 * validators/admin.validator.js — rules for moderation endpoints.
 *
 * Connects to: routes/admin.routes.js, config/constants.js.
 */
import { z } from "zod";
import { REPORT_STATUSES } from "../config/constants.js";
import { paginationQuery } from "./common.validator.js";

// GET /admin/reports?status=open&page=1
export const listReportsQuery = paginationQuery.extend({
  // TODO: status: z.enum(REPORT_STATUSES).default("open")
});

// PATCH /admin/reports/:id
export const resolveReportBody = z.object({
  // TODO:
  //   status: z.enum(["reviewing", "actioned", "dismissed"])
  //   resolutionNote: string max 500, optional
  //   action: optional z.enum(["none", "hide_mission", "ban_user", "delete_message"])
});

// PATCH /admin/users/:id/ban
export const banUserBody = z.object({
  // TODO: banned: boolean, reason: string max 300 optional
});
