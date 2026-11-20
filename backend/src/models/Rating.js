/**
 * models/Rating.js — after a mission ends, members rate each other
 * (did they show up? were they helpful?). Feeds the reliability score.
 *
 * Connects to:
 *   services/rating.service.js → creates ratings + recalculates User.reliability
 *   models/User.js, models/Mission.js (refs)
 */
import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema(
  {
    // mission:
    //   TODO: ObjectId, ref "Mission", required
    //
    // rater:
    //   TODO: ObjectId, ref "User", required   HINT: the person giving the rating (req.user)
    //
    // ratee:
    //   TODO: ObjectId, ref "User", required   HINT: the person being rated
    //
    // score:
    //   TODO: Number, required, min 1, max 5   HINT: add validate: Number.isInteger
    //
    // showedUp:
    //   TODO: Boolean, required   HINT: false → increments ratee's stats.noShows
    //
    // comment:
    //   TODO: String, trim, maxlength 300
  },
  { timestamps: true }
);

// TODO: indexes
//   ratingSchema.index({ mission: 1, rater: 1, ratee: 1 }, { unique: true })
//     ↑ one rating per person per mission. A duplicate throws error code 11000 →
//       errorHandler turns it into 409 "Already rated".
//   ratingSchema.index({ ratee: 1, createdAt: -1 })  ← "ratings I received"

export const Rating = mongoose.model("Rating", ratingSchema);
