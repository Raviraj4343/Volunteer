/**
 * controllers/rating.controller.js — HTTP layer for post-mission ratings.
 *
 * Connects to: services/rating.service.js, utils/apiResponse.js.
 * Used by: routes/mission.routes.js (POST /missions/:id/ratings).
 */
import * as ratingService from "../services/rating.service.js";
import { sendCreated } from "../utils/apiResponse.js";

// POST /api/missions/:id/ratings
export async function submitRatings(req, res) {
  // TODO: ratingService.submitRatings(missionId, req.user, req.validated.body.ratings)
  //       → sendCreated(res, null, "Thanks for rating your crew!")
}
