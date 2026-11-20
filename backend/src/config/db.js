/**
 * config/db.js — opens and closes the MongoDB Atlas connection.
 *
 * Connects to: config/env.js (MONGODB_URI), server.js (calls connectDB on start
 * and disconnectDB on shutdown). Models in models/ use this same connection
 * automatically — mongoose keeps one shared default connection.
 */
import mongoose from "mongoose";
import { env, isProduction } from "./env.js";

export async function connectDB() {
  // TODO:
  //   1. mongoose.set("strictQuery", true)  — ignore unknown fields in filters
  //   2. await mongoose.connect(env.MONGODB_URI)
  //   3. log the host: mongoose.connection.host
  //   4. listen for connection "error" and "disconnected" events and log them
  //   5. In production, set autoIndex: false and build indexes deliberately
  //      (or run Model.syncIndexes() once) — auto-building big indexes on boot is slow.
  // HINT: If it fails, check Atlas → Network Access → add your IP (or 0.0.0.0/0 for dev).
  //       Search: "mongoose connect options", "mongoose autoIndex production".
}

export async function disconnectDB() {
  // TODO: await mongoose.connection.close()
}
