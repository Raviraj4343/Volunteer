/**
 * models/Report.js — a user flags a mission, user or message as unsafe/spam.
 * Admins review these in the moderation queue.
 *
 * Connects to:
 *   controllers/report.controller.js → POST /reports  (frontend: ReportDialog)
 *   controllers/admin.controller.js  → list + resolve reports
 *   models/User.js (reporter, resolvedBy)
 */
import mongoose from "mongoose";
import { REPORT_TARGETS, REPORT_REASONS, REPORT_STATUSES } from "../config/constants.js";

const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    // reporter:
    //   TODO: ObjectId, ref "User", required
    //
    // targetType:
    //   TODO: String, enum REPORT_TARGETS, required   (frontend sends "mission" | "user")
    //
    // targetId:
    //   TODO: ObjectId, required, refPath: "targetModel"
    //   HINT: "refPath" lets one field point to different collections.
    //         Search: "mongoose refPath dynamic references".
    //
    // targetModel:
    //   TODO: String, enum ["Mission", "User", "Message"]   HINT: set from targetType before saving.
    //
    // reason:
    //   TODO: String, enum REPORT_REASONS, required
    //
    // details:
    //   TODO: String, trim, maxlength 500
    //
    // status:
    //   TODO: String, enum REPORT_STATUSES, default "open"
    //
    // resolvedBy:
    //   TODO: ObjectId, ref "User", default null   (the admin)
    //
    // resolutionNote:
    //   TODO: String, maxlength 500
  },
  { timestamps: true }
);

// TODO: indexes
//   reportSchema.index({ status: 1, createdAt: -1 })                  ← admin queue
//   reportSchema.index({ reporter: 1, targetId: 1 }, { unique: true }) ← one report per target per user

export const Report = mongoose.model("Report", reportSchema);
