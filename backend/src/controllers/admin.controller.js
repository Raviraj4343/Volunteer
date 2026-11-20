/**
 * controllers/admin.controller.js — moderation tools (admins only).
 *
 * Connects to: services/report.service.js, models/Mission.js (hide/unhide),
 * utils/apiResponse.js, utils/pagination.js.
 * Used by: routes/admin.routes.js (protected by requireUser + requireAdmin).
 */
import * as reportService from "../services/report.service.js";
import { Mission } from "../models/Mission.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { getPagination } from "../utils/pagination.js";

// GET /api/admin/reports?status=open
export async function listReports(req, res) {
  // TODO: reportService.listReports({ status, ...getPagination(query) }) → sendSuccess(res, items, { meta })
}

// PATCH /api/admin/reports/:id
export async function resolveReport(req, res) {
  // TODO: reportService.resolveReport(id, req.user, req.validated.body) → sendSuccess
}

// PATCH /api/admin/users/:id/ban
export async function setUserBan(req, res) {
  // TODO: reportService.setUserBan(id, req.validated.body.banned) → sendSuccess
  // HINT: An admin should not be able to ban themselves (or other admins).
}

// PATCH /api/admin/missions/:id/visibility
export async function setMissionVisibility(req, res) {
  // TODO: Mission.updateOne({ _id: id }, { isHidden: req.body.hidden }) → sendSuccess
  // HINT: This is the one place a controller may touch a model directly — it's a one-liner.
  //       If it grows, move it to a service.
}

// GET /api/admin/stats
export async function getDashboardStats(req, res) {
  // TODO: counts for a small admin dashboard: users, missions this week, open reports
  // HINT: Promise.all([User.estimatedDocumentCount(), ...]) — estimatedDocumentCount is instant.
}
