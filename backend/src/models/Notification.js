/**
 * models/Notification.js — in-app notifications ("Rohan joined your mission",
 * "Mission starts in 1 hour", "You earned a badge").
 *
 * Connects to:
 *   services/notification.service.js → creates them (and pushes via Socket.io)
 *   controllers/notification.controller.js → list / mark as read
 *   models/User.js (ref)
 */
import mongoose from "mongoose";
import { NOTIFICATION_TYPES } from "../config/constants.js";

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    // user:
    //   TODO: ObjectId, ref "User", required   HINT: who RECEIVES it
    //
    // type:
    //   TODO: String, enum NOTIFICATION_TYPES, required
    //
    // title:
    //   TODO: String, required, maxlength 120   e.g. "Rohan joined DSA prep group"
    //
    // body:
    //   TODO: String, maxlength 300
    //
    // link:
    //   TODO: String   HINT: frontend path to open on tap, e.g. "/missions/<id>"
    //
    // actor:
    //   TODO: ObjectId, ref "User", default null   HINT: who caused it (for the avatar)
    //
    // readAt:
    //   TODO: Date, default null   HINT: null = unread. A date is more useful than a boolean.
  },
  { timestamps: true }
);

// TODO: indexes
//   notificationSchema.index({ user: 1, createdAt: -1 })            ← list newest first
//   notificationSchema.index({ user: 1, readAt: 1 })                ← unread count
//   notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 })
//     ↑ TTL index: MongoDB deletes notifications older than 90 days by itself.
//       Search: "mongodb TTL index".

export const Notification = mongoose.model("Notification", notificationSchema);
