/**
 * models/User.js — a person using Volunteer. Our copy of the Clerk user,
 * plus everything Clerk doesn't know about (city, bio, impact stats, badges,
 * reliability, blocked users, role).
 *
 * Connects to:
 *   controllers/webhook.controller.js → creates/updates/deletes users from Clerk events
 *   middlewares/auth.js               → finds the user by clerkId on every request
 *   services/user.service.js          → stats, reliability, blocking
 *   Mission.host / Mission.members, Message.sender, Rating, Report, Notification → ref "User"
 */
import mongoose from "mongoose";
import { USER_ROLES } from "../config/constants.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // clerkId:
    //   TODO: String, required, unique, index
    //   HINT: The Clerk id ("user_2ab…"). This is how we link a Clerk session to this document.
    //
    // email:
    //   TODO: String, required, lowercase: true, trim: true
    //   HINT: Comes from the webhook (email_addresses[0].email_address). Never expose it publicly.
    //
    // name:
    //   TODO: String, required, trim, maxlength 80
    //
    // avatarUrl:
    //   TODO: String, default null   HINT: Clerk's image_url from the webhook.
    //
    // bio:
    //   TODO: String, trim, maxlength 280, default ""
    //
    // city:
    //   TODO: String, trim, default ""
    //
    // homeLocation:
    //   TODO: GeoJSON Point → { type: { type: String, enum: ["Point"] }, coordinates: [Number] }
    //   HINT: Optional. Lets you default nearby search to the user's area. [lng, lat] order!
    //         Search: "mongoose geojson point schema".
    //
    // role:
    //   TODO: String, enum USER_ROLES, default "user"
    //
    // isBanned:
    //   TODO: Boolean, default false   HINT: Set by admins (controllers/admin.controller.js).
    //
    // deletedAt:
    //   TODO: Date, default null   HINT: "soft delete" when Clerk sends user.deleted — keeps
    //         old chats/ratings readable instead of breaking references.
    //
    // blockedUsers:
    //   TODO: [{ type: Schema.Types.ObjectId, ref: "User" }]
    //   HINT: Filter these hosts out of mission lists and messages. Use $addToSet to add (no duplicates).
    //
    // stats:
    //   TODO: nested object → missionsJoined, missionsCompleted, missionsHosted,
    //         hoursContributed, noShows — all Number, default 0, min 0
    //   HINT: Store counters instead of recounting every time ("denormalisation").
    //         Update them with $inc. Search: "mongoose $inc".
    //
    // reliability:
    //   TODO: { average: Number (default 5, min 1, max 5), count: Number (default 0) }
    //   HINT: Recalculated in services/rating.service.js after each Rating.
    //
    // badges:
    //   TODO: [{ key: String, label: String, earnedAt: Date }]
    //   HINT: e.g. { key: "first_mission", label: "First mission" }. Awarded in user.service.js.
    //
    // lastActiveAt:
    //   TODO: Date   HINT: Optional — handy for "active recently" in study matching.
  },
  {
    timestamps: true, // adds createdAt / updatedAt automatically
    // TODO: add toJSON: { virtuals: true, transform(doc, ret) { ret.id = ret._id; delete ret._id; delete ret.__v; } }
    // HINT: The frontend expects `id`, not `_id`. Search: "mongoose toJSON transform".
  }
);

// TODO: indexes
//   userSchema.index({ homeLocation: "2dsphere" }, { sparse: true })
// HINT: clerkId is already indexed by `unique: true` — don't add it twice.

export const User = mongoose.model("User", userSchema);
