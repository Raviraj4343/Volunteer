/**
 * middlewares/auth.js — protects routes and loads the logged-in user.
 *
 * How auth works in this app:
 *   frontend → Clerk gives a session token → sent as "Authorization: Bearer <token>"
 *   app.js   → clerkMiddleware() verifies it and attaches auth info to req
 *   here     → requireUser turns "Clerk user id" into OUR MongoDB User (req.user)
 *
 * Connects to: @clerk/express (getAuth), models/User.js,
 * services/user.service.js (findOrCreateFromClerk), utils/ApiError.js.
 * Used by: every file in routes/ (except webhooks + health).
 */
import { getAuth } from "@clerk/express";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { findOrCreateFromClerk } from "../services/user.service.js";

export async function requireUser(req, res, next) {
  // TODO:
  //   1. const { userId } = getAuth(req)  — this is the CLERK id ("user_2ab…"), not a Mongo id
  //   2. if no userId → throw ApiError.unauthorized()
  //   3. find our user: User.findOne({ clerkId: userId })
  //   4. if not found (webhook hasn't arrived yet) → await findOrCreateFromClerk(userId)
  //   5. if user.isBanned → throw ApiError.forbidden("Your account is suspended.")
  //   6. req.user = user; next()
  // HINT: Express 5 automatically catches errors thrown in async middleware and
  //       sends them to errorHandler — no try/catch or asyncHandler needed.
  //       Search: "clerk express getAuth", "express 5 async error handling".
}

export function requireAdmin(req, res, next) {
  // TODO: must run AFTER requireUser. If req.user.role !== "admin" → throw ApiError.forbidden()
  // HINT: Make yourself admin by editing your user document in Atlas (role: "admin").
}

export async function optionalUser(req, res, next) {
  // TODO: same as requireUser but NEVER throws — if not signed in, just call next()
  //       with req.user undefined. Useful for public pages (e.g. a shared mission link).
}
