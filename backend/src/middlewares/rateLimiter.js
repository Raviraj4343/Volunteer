/**
 * middlewares/rateLimiter.js — limits how many requests one client can make,
 * protecting the API from spam, brute force and runaway frontend loops.
 *
 * Connects to: express-rate-limit, config/env.js (window + max).
 * Used in: app.js (apiLimiter on all /api routes) and specific routes that
 * need stricter limits (reports, mission creation, uploads).
 */
import { rateLimit } from "express-rate-limit";
import { env } from "../config/env.js";

// TODO: fill in the options for each limiter:
//   windowMs        → env.RATE_LIMIT_WINDOW_MS (15 min)
//   limit           → env.RATE_LIMIT_MAX
//   standardHeaders → "draft-8"  (sends RateLimit-* headers)
//   legacyHeaders   → false
//   handler / message → respond in OUR shape: { success: false, data: null, message: "Too many requests…" }
// HINT: Search "express-rate-limit options", "express-rate-limit keyGenerator".
//       For per-user limits, keyGenerator can use the Clerk userId instead of the IP.
//       Remember app.set("trust proxy", 1) in app.js or every user shares one IP in production!

export const apiLimiter = rateLimit({
  // TODO: general limit for all /api routes
});

export const writeLimiter = rateLimit({
  // TODO: stricter — e.g. 20 creates per hour. Use on POST /missions and POST /uploads.
});

export const reportLimiter = rateLimit({
  // TODO: e.g. 10 reports per hour — stops people from mass-reporting.
});
