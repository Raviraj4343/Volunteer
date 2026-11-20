/**
 * services/mission.service.js — the heart of the backend: nearby search,
 * filters, pagination, CRUD, join/leave, check-in.
 *
 * Connects to: models/Mission.js, models/User.js, models/Message.js (system messages),
 * services/notification.service.js, services/user.service.js (hidden users, badges),
 * utils/geo.js, utils/dates.js, utils/pagination.js, utils/serialize.js, utils/ApiError.js.
 * Used by: controllers/mission.controller.js.
 *
 * Reference behaviour (same logic, in the browser):
 *   frontend/src/services/api/mock/adapter.js → GET /missions, join, leave
 */
import mongoose from "mongoose";
import { Mission } from "../models/Mission.js";
import { User } from "../models/User.js";
import { Message } from "../models/Message.js";
import { ApiError } from "../utils/ApiError.js";
import { toPoint, kmToMeters, metersToKm } from "../utils/geo.js";
import { dateRangeFor } from "../utils/dates.js";
import { buildMeta } from "../utils/pagination.js";
import { toMissionDTO } from "../utils/serialize.js";
import { getHiddenUserIds, evaluateBadges } from "./user.service.js";
import { notify, notifyMany } from "./notification.service.js";
import { CHECK_IN_WINDOW_MINUTES } from "../config/constants.js";

/** Turns validated query params into a MongoDB filter object (no geo part). */
export function buildMissionFilter({ category, date, q }, hiddenUserIds = []) {
  // TODO: build and return an object like:
  //   {
  //     status: "upcoming",
  //     isHidden: false,
  //     ...dateRangeFor(date),                         → { startsAt: { $gte, $lte } }
  //     ...(category !== "all" && { category }),
  //     ...(hiddenUserIds.length && { host: { $nin: hiddenUserIds } }),
  //     ...(q && { $or: [{ title: regex }, { "location.area": regex }, { tags: regex }] }),
  //   }
  // HINT: Escape user input before new RegExp(q, "i") — characters like "(" break regexes.
  //       Search: "escape string for regex javascript".
}

/**
 * GET /missions — nearby list with filters + pagination.
 * Returns { items, total, meta } — the frontend reads `items` and `total`.
 */
export async function listMissions(query, viewer) {
  // TODO:
  //   1. hidden = await getHiddenUserIds(viewer._id)
  //   2. filter = buildMissionFilter(query, hidden)
  //   3. IF lat/lng given → use an aggregation pipeline:
  //        [
  //          { $geoNear: {
  //              near: toPoint({ lat, lng }),
  //              distanceField: "distanceMeters",
  //              maxDistance: distance === "any" ? undefined : kmToMeters(Number(distance)),
  //              query: filter,          ← filters go INSIDE $geoNear
  //              spherical: true,
  //          } },
  //          { $sort: { urgent: -1, distanceMeters: 1 } },
  //          { $facet: { items: [{ $skip }, { $limit }], total: [{ $count: "count" }] } },
  //        ]
  //      ELSE → Mission.find(filter).sort({ urgent: -1, startsAt: 1 }).skip().limit()
  //             + Mission.countDocuments(filter)  (run both with Promise.all)
  //   4. Populate host + first members (aggregate results aren't documents:
  //      use Mission.populate(items, [{ path: "host" }, { path: "members", perDocument limit… }])
  //      or a $lookup stage)
  //   5. items.map(m => toMissionDTO(m, { viewerId, distanceKm: metersToKm(m.distanceMeters) }))
  //   6. return { items, total, meta: buildMeta(...) }
  // HINT: $geoNear MUST be the first stage of the pipeline, and needs the 2dsphere index.
  //       Why not $near with find()? $near can't be used with countDocuments() (needed for
  //       pagination). Search: "mongodb $geoNear aggregation", "$facet pagination".
}

export async function getMissionById(id, viewer, origin) {
  // TODO:
  //   1. Mission.findOne({ _id: id, isHidden: false }).populate("host").populate("members")
  //   2. not found → ApiError.notFound("This mission doesn't exist or was removed.")
  //   3. if host is in viewer's hidden users → also 404
  //   4. distanceKm: if origin, compute it (haversine in utils/geo.js, or a $geoNear on this id)
  //   5. return toMissionDTO(mission, { viewerId, distanceKm, includeMembers: true })
  // HINT: Use .lean() for read-only queries — returns plain objects, much faster.
}

export async function createMission(data, host) {
  // TODO:
  //   1. Mission.create({ ...data, location: { name, area, city, point: toPoint(data.location) },
  //                       host: host._id, members: [host._id] })
  //   2. $inc host.stats.missionsHosted by 1
  //   3. create a system Message: "Mission created by <name>"
  //   4. populate host + members and return toMissionDTO(...)
  // HINT: Multi-step writes can leave half-finished data if one step fails.
  //       Later, look up "mongoose transactions session" (Atlas supports them).
}

export async function updateMission(id, updates, user) {
  // TODO:
  //   1. load mission → 404 if missing
  //   2. only the host (or an admin) may edit → ApiError.forbidden()
  //   3. can't edit completed/cancelled missions → ApiError.conflict()
  //   4. if spotsTotal < members.length → ApiError.conflict("Can't go below the people already joined")
  //   5. if location changed → convert with toPoint()
  //   6. save, then notifyMany(other members, "mission_updated")
  // HINT: Use mission.set(updates); await mission.save() — this runs validators.
}

export async function cancelMission(id, user, reason) {
  // TODO: host only → status = "cancelled", cancelledReason = reason →
  //       notify all members ("mission_cancelled") → system message in the chat.
  // HINT: Prefer cancelling over deleting — members' history and chat stay intact.
}

export async function joinMission(id, user) {
  // TODO:
  //   1. Do it in ONE atomic update so two people can't take the last spot at once:
  //        Mission.findOneAndUpdate(
  //          { _id: id, status: "upcoming", isHidden: false, members: { $ne: user._id },
  //            $expr: { $lt: [{ $size: "$members" }, "$spotsTotal"] } },
  //          { $addToSet: { members: user._id } },
  //          { new: true }
  //        )
  //   2. If null → find out WHY to return a helpful error:
  //        not found (404) / already a member (just return it) / full (409 "Sorry, this mission just filled up.")
  //   3. $inc user.stats.missionsJoined
  //   4. system message "<name> joined" + notify(host, "mission_joined")
  //   5. io.to(`mission:${id}`).emit("mission:updated", …) (optional; get io via app.get("io") in the controller)
  //   6. return toMissionDTO(...)
  // HINT: This is called a "race condition". Search: "mongodb atomic update race condition", "$expr $size".
}

export async function leaveMission(id, user) {
  // TODO:
  //   1. host can't leave → ApiError.conflict("Hosts can't leave their own mission. Cancel it instead.")
  //   2. $pull user._id from members
  //   3. leaving < 24h before start → small reliability penalty? (your design decision!)
  //   4. system message + notify host ("mission_left")
  //   5. return toMissionDTO(...)
}

export async function checkIn(id, user, { lat, lng }) {
  // TODO:
  //   1. must be a member → ApiError.forbidden()
  //   2. now must be within CHECK_IN_WINDOW_MINUTES of startsAt → else ApiError.conflict("Check-in isn't open yet")
  //   3. user must be within ~300 m of the mission:
  //        Mission.exists({ _id: id, "location.point": { $near: { $geometry: toPoint({lat,lng}), $maxDistance: 300 } } })
  //   4. not already checked in → $push { user, at: new Date() } to checkIns
  //   5. $inc user.stats.hoursContributed by mission.durationHours, missionsCompleted by 1
  //   6. await evaluateBadges(user._id)
  // HINT: Never trust the client's word that they "were there" — always verify location server-side.
}

/** Missions the user joined or hosts (Chats list + Profile history). */
export async function listMyMissions(user, { scope = "upcoming", page, limit, skip }) {
  // TODO: Mission.find({ members: user._id, ...(scope === "upcoming" ? { startsAt: { $gte: now } } : { startsAt: { $lt: now } }) })
  //       sort by startsAt, paginate, populate host, map toMissionDTO.
}

/** Marks missions as "completed" once they end. Call from a timer in server.js or a cron job. */
export async function completeFinishedMissions() {
  // TODO: Mission.updateMany({ status: "upcoming", <ends before now> }, { $set: { status: "completed" } })
  // HINT: "ends before now" needs startsAt + durationHours → $expr with $add. Or simply use
  //       startsAt < now - 24h. Then notify members to rate each other. Search: "node-cron".
}
