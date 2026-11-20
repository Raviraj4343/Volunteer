/**
 * services/user.service.js — business logic about users: syncing from Clerk,
 * profiles, impact stats, badges, blocking.
 *
 * Why services? Controllers handle HTTP (req/res). Services hold the logic and
 * talk to the database. The same service can then be reused by sockets,
 * webhooks or scheduled jobs that have no req/res.
 *
 * Connects to: models/User.js, models/Mission.js, @clerk/express (clerkClient),
 * utils/serialize.js, utils/ApiError.js.
 * Used by: controllers/user.controller.js, controllers/webhook.controller.js,
 *          middlewares/auth.js, services/rating.service.js, services/mission.service.js.
 */
import { clerkClient } from "@clerk/express";
import { User } from "../models/User.js";
import { Mission } from "../models/Mission.js";
import { ApiError } from "../utils/ApiError.js";
import { toPublicUser } from "../utils/serialize.js";

/** Maps a Clerk user object (from webhook or API) to our User fields. */
export function mapClerkUser(clerkUser) {
  // TODO: return { clerkId, email, name, avatarUrl }
  // HINT: Clerk's webhook uses snake_case: id, first_name, last_name, image_url,
  //       email_addresses[] + primary_email_address_id (find the primary one!).
  //       Name fallback: first + last → username → "Volunteer".
  //       Log one webhook payload once to see the real shape.
}

/** Create or update our user from a Clerk webhook (user.created / user.updated). */
export async function upsertFromClerk(clerkUser) {
  // TODO: User.findOneAndUpdate({ clerkId }, { $set: mapClerkUser(clerkUser) }, { upsert: true, new: true })
  // HINT: "upsert" = update if exists, insert if not. Makes the webhook safe to receive twice
  //       (Clerk RETRIES webhooks — your handler must be idempotent). Search: "mongoose upsert".
}

/** Fallback when a request arrives before the webhook created the user. */
export async function findOrCreateFromClerk(clerkUserId) {
  // TODO:
  //   1. const clerkUser = await clerkClient.users.getUser(clerkUserId)
  //   2. return upsertFromClerk(...)  — BUT note: the Backend API returns camelCase
  //      (firstName, imageUrl, emailAddresses) unlike the webhook's snake_case.
  //      Handle both in mapClerkUser, or map here first.
  // HINT: Search "clerk backend sdk getUser".
}

export async function softDeleteByClerkId(clerkId) {
  // TODO: set deletedAt = now, clear email/name ("Deleted user"), keep the _id so old refs still work.
}

export async function getMe(userId) {
  // TODO: return the full profile for the logged-in user (they may see their own email and stats).
}

export async function getPublicProfile(userId, viewerId) {
  // TODO:
  //   1. find user (not deleted) → else ApiError.notFound("User not found")
  //   2. if the viewer is blocked by this user (or blocked them) → 404 as well (don't reveal it)
  //   3. return { ...toPublicUser(user), stats, badges, reliability }
}

export async function updateMe(userId, updates) {
  // TODO: User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true })
  // HINT: runValidators: true — update queries skip schema validation by default!
}

/**
 * Impact stats for the Profile screen: missions joined/hosted/completed,
 * hours contributed, reliability, badges, plus a breakdown by category.
 */
export async function getImpactStats(userId) {
  // TODO:
  //   1. Read the stored counters from user.stats (cheap)
  //   2. Category breakdown with an aggregation:
  //        Mission.aggregate([
  //          { $match: { members: userId, status: "completed" } },
  //          { $group: { _id: "$category", count: { $sum: 1 }, hours: { $sum: "$durationHours" } } }
  //        ])
  //   3. return { ...stats, reliability, badges, byCategory }
  // HINT: In aggregate(), ids are NOT auto-cast — wrap with new mongoose.Types.ObjectId(userId).
  //       Search: "mongodb aggregation $group".
}

/** Award badges after stats change. Called from mission.service (check-in) and rating.service. */
export async function evaluateBadges(userId) {
  // TODO: define a small list of rules, e.g.
  //   { key: "first_mission",  label: "First mission",  test: (s) => s.missionsCompleted >= 1 }
  //   { key: "ten_missions",   label: "Regular",        test: (s) => s.missionsCompleted >= 10 }
  //   { key: "host",           label: "Organiser",      test: (s) => s.missionsHosted >= 1 }
  //   { key: "fifty_hours",    label: "50 hours",       test: (s) => s.hoursContributed >= 50 }
  //   For each rule passed and not already earned → $push to badges + notify (badge_earned).
}

export async function blockUser(userId, targetId) {
  // TODO:
  //   1. can't block yourself → ApiError.badRequest
  //   2. target must exist → ApiError.notFound
  //   3. User.updateOne({ _id: userId }, { $addToSet: { blockedUsers: targetId } })
}

export async function unblockUser(userId, targetId) {
  // TODO: $pull targetId from blockedUsers
}

/** Ids the viewer shouldn't see: people they blocked + people who blocked them. */
export async function getHiddenUserIds(userId) {
  // TODO:
  //   1. me.blockedUsers
  //   2. + User.find({ blockedUsers: userId }).distinct("_id")
  //   3. return the combined array
  // HINT: Used by mission.service (hide their missions) and chat (hide their messages).
}
