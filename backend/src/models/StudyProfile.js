/**
 * models/StudyProfile.js — what a user wants to study, for which exam, at what
 * level, and when they're free. Used to match study mates.
 *
 * Connects to:
 *   services/study.service.js       → matching logic
 *   controllers/study.controller.js → GET/PUT /study/profile, GET /study/matches
 *   models/User.js (ref)
 */
import mongoose from "mongoose";
import { STUDY_LEVELS, WEEKDAYS, TIME_SLOTS } from "../config/constants.js";

const { Schema } = mongoose;

const studyProfileSchema = new Schema(
  {
    // user:
    //   TODO: ObjectId, ref "User", required, unique   HINT: one study profile per user.
    //
    // subjects:
    //   TODO: [String], at least 1, max 10, each trimmed
    //   HINT: Store lowercase too (or a separate subjectsLower array) so "Physics" matches "physics".
    //
    // exam:
    //   TODO: String, trim   HINT: e.g. "NEET PG", "UPSC CSE", "CAT", "JEE Advanced".
    //
    // level:
    //   TODO: String, enum STUDY_LEVELS, required
    //
    // availability:
    //   TODO: [{ day: enum WEEKDAYS, slots: [enum TIME_SLOTS] }]
    //   HINT: e.g. [{ day: "sat", slots: ["morning", "evening"] }]. Overlapping slots = good match.
    //
    // mode:
    //   TODO: String, enum ["in_person", "online", "either"], default "either"
    //
    // location:
    //   TODO: GeoJSON Point (same shape as Mission.location.point)
    //
    // bio:
    //   TODO: String, maxlength 280
    //
    // isActive:
    //   TODO: Boolean, default true, index   HINT: Let users pause matching without deleting.
  },
  { timestamps: true }
);

// TODO: indexes
//   studyProfileSchema.index({ location: "2dsphere" })
//   studyProfileSchema.index({ exam: 1, level: 1 })
//   studyProfileSchema.index({ subjects: 1 })   ← "multikey" index: works on arrays automatically

export const StudyProfile = mongoose.model("StudyProfile", studyProfileSchema);
