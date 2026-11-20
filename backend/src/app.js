/**
 * app.js — builds and configures the Express app (no listening here).
 *
 * Connects to:
 *   config/env.js            → CLIENT_URLS, NODE_ENV
 *   middlewares/rateLimiter.js, middlewares/notFound.js, middlewares/errorHandler.js
 *   routes/index.js          → every /api/* route
 *   routes/webhook.routes.js → mounted BEFORE express.json() (needs the raw body)
 *   server.js                → calls createApp()
 */
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";
import { env } from "./config/env.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import webhookRoutes from "./routes/webhook.routes.js";
import apiRoutes from "./routes/index.js";

export function createApp() {
  const app = express();

  // TODO (ORDER MATTERS — middleware runs top to bottom):
  //   1. app.set("trust proxy", 1)   — needed for correct IPs behind Render/Railway (rate limiting!)
  //   2. app.use(helmet())            — secure HTTP headers
  //   3. app.use(cors({ origin: env.CLIENT_URLS, credentials: true }))
  //   4. if not production: app.use(morgan("dev")) — request logging
  //   5. app.use("/api/webhooks", webhookRoutes)
  //        ↑ BEFORE express.json(): svix must verify the *raw* body bytes.
  //   6. app.use(express.json({ limit: "100kb" }))  — parse JSON bodies, cap the size
  //   7. app.use(clerkMiddleware())   — reads the Bearer token on every request (doesn't block)
  //   8. app.get("/api/health", ...)  — return { success: true, data: { status: "ok" } }
  //   9. app.use("/api", apiLimiter, apiRoutes)
  //  10. app.use(notFound)            — any route not matched above
  //  11. app.use(errorHandler)        — MUST be last; Express spots it by its 4 arguments
  // HINT: Search "express middleware order", "helmet express", "cors options origin array".

  return app;
}
