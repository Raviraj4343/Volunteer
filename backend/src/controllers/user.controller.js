/**
 * controllers/user.controller.js — HTTP layer for profiles, impact stats and blocking.
 *
 * Connects to: services/user.service.js, services/rating.service.js, utils/apiResponse.js.
 * Used by: routes/user.routes.js.
 */
import * as userService from "../services/user.service.js";
import * as ratingService from "../services/rating.service.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { getPagination } from "../utils/pagination.js";

// GET /api/users/me
export async function getMe(req, res) {
  // TODO: userService.getMe(req.user._id) → sendSuccess
}

// PATCH /api/users/me
export async function updateMe(req, res) {
  // TODO: userService.updateMe(req.user._id, req.validated.body) → sendSuccess(..., { message: "Profile updated" })
}

// GET /api/users/me/stats
export async function getMyStats(req, res) {
  // TODO: userService.getImpactStats(req.user._id) → sendSuccess
}

// GET /api/users/:id
export async function getUser(req, res) {
  // TODO: userService.getPublicProfile(req.validated.params.id, req.user._id) → sendSuccess
}

// GET /api/users/:id/ratings
export async function getUserRatings(req, res) {
  // TODO: ratingService.getRatingsForUser(id, getPagination(req.query)) → sendSuccess
}

// POST /api/users/:id/block     (frontend: BlockUserDialog)
export async function blockUser(req, res) {
  // TODO: userService.blockUser(req.user._id, id) → sendSuccess(res, { ok: true }, { message: "User blocked" })
}

// DELETE /api/users/:id/block
export async function unblockUser(req, res) {
  // TODO: userService.unblockUser(req.user._id, id) → sendSuccess
}
