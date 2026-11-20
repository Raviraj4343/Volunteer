/**
 * services/rating.service.js — post-mission ratings and the reliability score.
 *
 * Connects to: models/Rating.js, models/Mission.js, models/User.js,
 * services/notification.service.js, services/user.service.js (evaluateBadges).
 * Used by: controllers/rating.controller.js.
 */
import mongoose from "mongoose";
import { Rating } from "../models/Rating.js";
import { Mission } from "../models/Mission.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { notify } from "./notification.service.js";
import { evaluateBadges } from "./user.service.js";

export async function submitRatings(missionId, rater, ratings) {
  // TODO:
  //   1. load mission → must be "completed" (or ended) → else ApiError.conflict("You can rate after the mission ends")
  //   2. rater AND every ratee must be members; nobody rates themselves
  //   3. Rating.insertMany(ratings.map(r => ({ mission, rater, ratee: r.rateeId, ... })), { ordered: false })
  //   4. for each ratee: await recalculateReliability(rateeId); if !showedUp → $inc stats.noShows
  //   5. notify each ratee ("rating_received") — don't reveal who gave which score
  // HINT: Duplicate ratings hit the unique index → error code 11000 → 409 via errorHandler.
}

/**
 * Reliability = a blend of average score and show-up rate, on a 1–5 scale.
 * Example formula (you can design your own!):
 *   avgScore     = average of all scores received
 *   showUpRate   = ratings with showedUp / total ratings
 *   reliability  = 0.6 * avgScore + 0.4 * (showUpRate * 5)
 * New users start at 5 — use a "Bayesian average" so 1 bad rating doesn't tank a new user:
 *   (C * 5 + sum) / (C + count), with C ≈ 3
 */
export async function recalculateReliability(userId) {
  // TODO:
  //   1. Rating.aggregate([
  //        { $match: { ratee: new mongoose.Types.ObjectId(userId) } },
  //        { $group: { _id: null, avg: { $avg: "$score" }, count: { $sum: 1 },
  //                    shows: { $sum: { $cond: ["$showedUp", 1, 0] } } } }
  //      ])
  //   2. compute the score with your formula, round to 1 decimal
  //   3. User.updateOne({ _id: userId }, { $set: { "reliability.average": …, "reliability.count": … } })
  // HINT: Search "mongodb $avg $cond aggregation", "bayesian average rating".
}

export async function getRatingsForUser(userId, { page, limit, skip }) {
  // TODO: recent ratings received (comments only, no rater identity unless you decide otherwise)
}
