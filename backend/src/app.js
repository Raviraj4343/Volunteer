/**
 * app.js — builds and configures the Express app (no listening here).
 *
 * Connects to:
 *   config/env.js            → CLIENT_URLS, NODE_ENV
 *   middlewares/rateLimiter.js, middlewares/notFound.js, middlewares/errorHandler.js
 *   utils/apiResponse.js     → sendSuccess() for the health check
 *   routes/index.js          → every /api/* route
 *   routes/webhook.routes.js → mounted BEFORE express.json() (needs the raw body)
 *   server.js                → calls createApp()
 */
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";
import { env, isProduction } from "./config/env.js";
import { sendSuccess } from "./utils/apiResponse.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import webhookRoutes from "./routes/webhook.routes.js";
import apiRoutes from "./routes/index.js";

export function createApp() {
  const app = express();

  // ORDER MATTERS — middleware runs top to bottom.

  // Trust one proxy (Render/Railway) so rate limiting sees the real client IP.
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URLS, credentials: true }));
  if (!isProduction) app.use(morgan("dev"));

  // BEFORE express.json(): svix must verify the *raw* body bytes.
  app.use("/api/webhooks", webhookRoutes);

  app.use(express.json({ limit: "100kb" }));

  // Reads the Bearer token on every request. It doesn't block; requireUser does that.
  app.use(clerkMiddleware());

  // ABOVE the limiter, so uptime checks never get a 429.
  app.get("/api/health", (req, res) => sendSuccess(res, { status: "ok" }));

  app.use("/api", apiLimiter, apiRoutes);

  // These two stay last: unmatched routes become a 404 error, then every error becomes JSON.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
