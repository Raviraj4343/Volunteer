/**
 * models/Mission.js — the core of the app: something people do together
 * (study session, cleanup, event, helping someone). Each mission has its own chat.
 *
 * Connects to:
 *   services/mission.service.js → nearby search, CRUD, join/leave, check-in
 *   models/Message.js           → Message.mission refs this
 *   models/Rating.js            → ratings happen after a mission
 *   utils/serialize.js          → turns this into the shape the frontend expects
 *
 * Frontend shape to match: frontend/src/services/api/mock/seed.js (one mission object)
 */
import mongoose from "mongoose";
import { MISSION_CATEGORIES, MISSION_STATUSES, STUDY_LEVELS } from "../config/constants.js";

const { Schema } = mongoose;

const pointSchema = new Schema(
  {
    // TODO: type:        { type: String, enum: ["Point"], required: true, default: "Point" }
    // TODO: coordinates: { type: [Number], required: true }   ← [lng, lat]!
    // HINT: add a custom validator: exactly 2 numbers, lng -180..180, lat -90..90.
  },
  { _id: false } // a sub-document that doesn't need its own id
);

const missionSchema = new Schema(
  {
    // title:
    //   TODO: String, required, trim, minlength 5, maxlength 100
    //
    // description:
    //   TODO: String, trim, maxlength 2000, default ""
    //
    // category:
    //   TODO: String, required, enum MISSION_CATEGORIES, index
    //
    // location:
    //   TODO: nested object:
    //     name:  String, required   (e.g. "Ulsoor Lake, Boat Club gate")
    //     area:  String             (e.g. "Halasuru")
    //     city:  String, required   (e.g. "Bengaluru")
    //     point: pointSchema, required
    //   HINT: The frontend sends { lat, lng } — convert with utils/geo.js → toPoint().
    //
    // startsAt:
    //   TODO: Date, required, index
    //   HINT: Validate it's in the future when CREATING (in the Zod validator, not here —
    //         old missions are still valid documents).
    //
    // durationHours:
    //   TODO: Number, required, min 0.5, max 24
    //
    // spotsTotal:
    //   TODO: Number, required, min 2, max 500
    //
    // host:
    //   TODO: ObjectId, ref "User", required, index
    //
    // members:
    //   TODO: [{ type: ObjectId, ref: "User" }]
    //   HINT: Host is also a member. Use $addToSet to join, $pull to leave.
    //         Fine for hundreds of members; for 10k+ you'd use a separate Membership collection.
    //
    // requirements:
    //   TODO: [String], each trimmed, max 10 items   HINT: e.g. ["Gloves", "Water bottle"]
    //
    // tags:
    //   TODO: [String], max 8 items
    //
    // urgent:
    //   TODO: Boolean, default false   HINT: The frontend shows urgent missions first.
    //
    // study:
    //   TODO: optional nested { subject: String, exam: String, level: enum STUDY_LEVELS }
    //   HINT: Only filled when category === "study".
    //
    // coverImage:
    //   TODO: { url: String, publicId: String }
    //   HINT: Keep Cloudinary's publicId so you can delete the image later.
    //
    // status:
    //   TODO: String, enum MISSION_STATUSES, default "upcoming", index
    //
    // checkIns:
    //   TODO: [{ user: ObjectId ref "User", at: Date }]
    //   HINT: Members check in at the location → proves they showed up → feeds reliability & hours.
    //
    // isHidden:
    //   TODO: Boolean, default false   HINT: Admins hide reported missions instead of deleting them.
    //
    // cancelledReason:
    //   TODO: String, default null
  },
  {
    timestamps: true,
    // TODO: toJSON transform (id instead of _id) — same as models/User.js
  }
);

// TODO: indexes — these make nearby search + filters fast:
//   missionSchema.index({ "location.point": "2dsphere" })      ← REQUIRED for $near / $geoNear
//   missionSchema.index({ category: 1, startsAt: 1 })           ← "study missions this week"
//   missionSchema.index({ status: 1, startsAt: 1 })
//   missionSchema.index({ title: "text", description: "text", tags: "text", "location.area": "text" })
// HINT: Search "mongoose 2dsphere index", "mongodb compound index order (ESR rule)".
//       ⚠️ $geoNear cannot be combined with a $text search in one query. For ?q= on the
//       nearby list, use a case-insensitive $regex on title/area instead.

// TODO: virtuals (computed, not stored):
//   missionSchema.virtual("endsAt").get(function () { … startsAt + durationHours })
//   missionSchema.virtual("spotsLeft").get(function () { … })
// HINT: Use `function`, not an arrow function — you need `this`. Search: "mongoose virtuals".

export const Mission = mongoose.model("Mission", missionSchema);
