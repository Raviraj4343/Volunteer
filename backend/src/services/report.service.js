/**
 * services/report.service.js — creating reports and admin moderation actions.
 *
 * Connects to: models/Report.js, models/Mission.js, models/User.js,
 * models/Message.js, utils/pagination.js, utils/ApiError.js.
 * Used by: controllers/report.controller.js, controllers/admin.controller.js.
 */
import { Report } from "../models/Report.js";
import { Mission } from "../models/Mission.js";
import { User } from "../models/User.js";
import { Message } from "../models/Message.js";
import { ApiError } from "../utils/ApiError.js";
import { buildMeta } from "../utils/pagination.js";

const TARGET_MODELS = { mission: Mission, user: User, message: Message };

export async function createReport(reporter, { targetType, targetId, reason, details }) {
  // TODO:
  //   1. target must exist: TARGET_MODELS[targetType].exists({ _id: targetId }) → else 404
  //   2. can't report yourself
  //   3. Report.create({ reporter, targetType, targetId, targetModel: "Mission" | "User" | "Message", reason, details })
  //   4. (optional) if a target gets ≥ 5 open reports → auto-hide it until an admin reviews
  // HINT: Duplicate report → 11000 → treat as success ("Thanks, we already have your report").
}

export async function listReports({ status, page, limit, skip }) {
  // TODO: find({ status }).sort({ createdAt: -1 }).populate("reporter", "name").populate("targetId")
  //       + countDocuments → { items, meta }
  // HINT: populate("targetId") works thanks to refPath in models/Report.js.
}

export async function resolveReport(reportId, admin, { status, resolutionNote, action }) {
  // TODO:
  //   1. load report → 404
  //   2. perform the action:
  //        "hide_mission"   → Mission.updateOne({ _id }, { isHidden: true })
  //        "ban_user"       → setUserBan(...)
  //        "delete_message" → Message.updateOne({ _id }, { deletedAt: new Date() })
  //   3. report.status = status; resolvedBy = admin._id; resolutionNote; save()
}

export async function setUserBan(userId, banned) {
  // TODO: User.updateOne({ _id: userId }, { isBanned: banned })
  // HINT: Also ban them in Clerk so they can't sign in at all:
  //       clerkClient.users.banUser(clerkId) / unbanUser(clerkId). Search: "clerk ban user api".
}
