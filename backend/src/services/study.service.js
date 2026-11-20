/**
 * services/study.service.js — study-mate profiles and matching.
 *
 * Connects to: models/StudyProfile.js, services/user.service.js (hidden users),
 * utils/geo.js, utils/pagination.js, utils/serialize.js.
 * Used by: controllers/study.controller.js.
 */
import { StudyProfile } from "../models/StudyProfile.js";
import { ApiError } from "../utils/ApiError.js";
import { toPoint, kmToMeters, metersToKm } from "../utils/geo.js";
import { buildMeta } from "../utils/pagination.js";
import { toPublicUser } from "../utils/serialize.js";
import { getHiddenUserIds } from "./user.service.js";

export async function getMyStudyProfile(userId) {
  // TODO: StudyProfile.findOne({ user: userId }) → may be null (frontend shows "set up your profile")
}

export async function upsertStudyProfile(userId, data) {
  // TODO: findOneAndUpdate({ user: userId }, { $set: { ...data, location: toPoint(...) } },
  //       { upsert: true, new: true, runValidators: true })
}

/**
 * Finds other students who fit well. Simple, explainable scoring:
 *   same exam            +40
 *   each shared subject  +15
 *   same level           +15  (adjacent level +5)
 *   overlapping slots    +5 each (max +25)
 *   distance             closer = better (in_person only)
 */
export async function findMatches(userId, query) {
  // TODO:
  //   1. me = await getMyStudyProfile(userId) → none? ApiError.badRequest("Create your study profile first.")
  //   2. Candidate filter: { user: { $ne: userId, $nin: hidden }, isActive: true,
  //        $or: [{ exam: me.exam }, { subjects: { $in: me.subjects } }] }
  //   3. If in-person: $geoNear (first stage!) with maxDistance from query.distance
  //   4. $lookup the user (name, avatar, reliability)
  //   5. Score each candidate in JS with the rules above (or $addFields in the pipeline)
  //   6. sort by score desc, paginate, return { items: [{ user, profile, score, reasons: ["Same exam", …] }], meta }
  // HINT: Returning `reasons` makes the UI friendlier ("Both preparing for NEET PG").
  //       Search: "mongodb $lookup", "$setIntersection" (to count shared subjects in the pipeline).
}
