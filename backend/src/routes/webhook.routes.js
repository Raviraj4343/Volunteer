/**
 * routes/webhook.routes.js — /api/webhooks: incoming events from Clerk.
 *
 * Connects to: controllers/webhook.controller.js.
 * Mounted in app.js BEFORE express.json() — and WITHOUT requireUser
 * (Clerk's servers aren't a signed-in user; the svix signature is the security).
 */
import express, { Router } from "express";
import { handleClerkWebhook } from "../controllers/webhook.controller.js";

const router = Router();

// TODO:
//   router.post("/clerk", express.raw({ type: "application/json" }), handleClerkWebhook)
// HINT: express.raw() gives req.body as a Buffer — the exact bytes Clerk signed.
//       If express.json() ran first, the bytes would change and verification would fail.

export default router;
