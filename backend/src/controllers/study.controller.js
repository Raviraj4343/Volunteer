/**
 * controllers/study.controller.js — HTTP layer for the study-mate finder.
 *
 * Connects to: services/study.service.js, utils/apiResponse.js, utils/pagination.js.
 * Used by: routes/study.routes.js.
 */
import * as studyService from "../services/study.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { getPagination } from "../utils/pagination.js";

// GET /api/study/profile
export async function getMyProfile(req, res) {
  // TODO: studyService.getMyStudyProfile(req.user._id) → sendSuccess (data may be null — that's fine)
}

// PUT /api/study/profile
export async function upsertMyProfile(req, res) {
  // TODO: studyService.upsertStudyProfile(req.user._id, req.validated.body) → sendSuccess(..., { message: "Study profile saved" })
  // HINT: PUT = "replace/create the whole thing" — a good fit for an upsert.
}

// GET /api/study/matches
export async function getMatches(req, res) {
  // TODO: studyService.findMatches(req.user._id, { ...req.validated.query, ...getPagination(req.validated.query) })
  //       → sendSuccess(res, result.items, { meta: result.meta })
}
