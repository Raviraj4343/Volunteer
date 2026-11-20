/**
 * services/notification.service.js — creates notifications and pushes them
 * live to the user's open tabs through Socket.io.
 *
 * Connects to: models/Notification.js, sockets/index.js (getIO → emit to the
 * user's personal room `user:<id>`), utils/pagination.js.
 * Used by: services/mission.service.js, rating.service.js, user.service.js,
 *          controllers/notification.controller.js.
 */
import { Notification } from "../models/Notification.js";
import { getIO } from "../sockets/index.js";
import { buildMeta } from "../utils/pagination.js";

export async function notify(userId, { type, title, body, link, actor }) {
  // TODO:
  //   1. don't notify people about their own actions (userId === actor) → return
  //   2. const n = await Notification.create({ user: userId, type, title, body, link, actor })
  //   3. getIO()?.to(`user:${userId}`).emit("notification:new", n)
  //   4. return n
  // HINT: Notifications are "nice to have" — wrap in try/catch and log errors,
  //       so a failed notification never breaks joining a mission.
}

export async function notifyMany(userIds, payload) {
  // TODO: Notification.insertMany(...) then emit to each user's room.
  // HINT: Search "socket.io emit to multiple rooms" — io.to([...rooms]).emit(...)
}

export async function listNotifications(userId, { page, limit, skip }) {
  // TODO:
  //   1. Promise.all([ find({ user }).sort({ createdAt: -1 }).skip().limit().populate("actor", "name avatarUrl"),
  //                    countDocuments({ user }),
  //                    countDocuments({ user, readAt: null }) ])
  //   2. return { items, unreadCount, meta: buildMeta(...) }
}

export async function markRead(userId, notificationId) {
  // TODO: updateOne({ _id: notificationId, user: userId }, { $set: { readAt: new Date() } })
  // HINT: Always include `user: userId` in the filter — otherwise anyone could
  //       mark anyone's notification by guessing ids ("IDOR" bug).
}

export async function markAllRead(userId) {
  // TODO: updateMany({ user: userId, readAt: null }, { $set: { readAt: new Date() } })
}
