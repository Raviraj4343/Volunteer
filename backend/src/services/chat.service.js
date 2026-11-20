/**
 * services/chat.service.js — saves and loads mission chat messages.
 * Shared by REST (history) and Socket.io (live messages).
 *
 * Connects to: models/Message.js, models/Mission.js, services/user.service.js
 * (hidden users), services/notification.service.js, utils/ApiError.js.
 * Used by: controllers/chat.controller.js, sockets/chat.socket.js.
 */
import { Message } from "../models/Message.js";
import { Mission } from "../models/Mission.js";
import { ApiError } from "../utils/ApiError.js";
import { getHiddenUserIds } from "./user.service.js";

/** Throws unless the user is a member of the mission. Reused by REST and sockets. */
export async function assertMember(missionId, userId) {
  // TODO:
  //   const ok = await Mission.exists({ _id: missionId, members: userId })
  //   if (!ok) throw ApiError.forbidden("Join this mission to see its chat.")
  // HINT: Mission.exists() is cheaper than findOne() — it only returns the _id.
}

/**
 * Cursor pagination: returns `limit` messages older than `before`.
 * Better than skip/limit for chats — new messages arriving don't shift pages.
 */
export async function getHistory(missionId, user, { before, limit }) {
  // TODO:
  //   1. await assertMember(missionId, user._id)
  //   2. filter = { mission: missionId, deletedAt: null }
  //      if (before) → filter._id = { $lt: before }     (ObjectIds grow over time ✔)
  //   3. hide messages from blocked users: sender: { $nin: hiddenIds }
  //   4. Message.find(filter).sort({ _id: -1 }).limit(limit + 1).populate("sender", "name avatarUrl").lean()
  //   5. hasMore = results.length > limit → drop the extra one
  //   6. return { items: results.reverse() (oldest→newest for display), nextCursor, hasMore }
  // HINT: Fetching limit + 1 is a neat trick to know if there's another page.
  //       Search: "cursor based pagination mongodb".
}

export async function createMessage({ missionId, sender, text }) {
  // TODO:
  //   1. await assertMember(missionId, sender._id)
  //   2. Message.create({ mission: missionId, sender: sender._id, type: "text", text })
  //   3. populate sender (name, avatarUrl) and return a plain object
  //   4. (later) notify members who are NOT online — see notification.service.js
}

export async function createSystemMessage(missionId, text) {
  // TODO: Message.create({ mission: missionId, type: "system", text })
  // HINT: Also emit it over Socket.io so open chats update live (pass io in, or emit from the caller).
}

export async function deleteMessage(messageId, user) {
  // TODO: only the sender (or an admin) → set deletedAt = now (soft delete)
}
