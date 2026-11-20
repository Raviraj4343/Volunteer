/**
 * controllers/webhook.controller.js — receives Clerk events (user.created,
 * user.updated, user.deleted) and keeps our MongoDB users in sync.
 *
 * Connects to: svix (signature verification), config/env.js (signing secret),
 * services/user.service.js (upsertFromClerk, softDeleteByClerkId).
 * Used by: routes/webhook.routes.js (mounted in app.js BEFORE express.json()).
 *
 * Setup: Clerk dashboard → Configure → Webhooks → Add endpoint
 *   URL: https://<your-public-url>/api/webhooks/clerk
 *   Events: user.created, user.updated, user.deleted
 *   For local dev, expose localhost with ngrok (search: "ngrok http 5000").
 */
import { Webhook } from "svix";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
import { upsertFromClerk, softDeleteByClerkId } from "../services/user.service.js";

export async function handleClerkWebhook(req, res) {
  // TODO:
  //   1. Read the three headers: "svix-id", "svix-timestamp", "svix-signature"
  //      → if any missing → throw ApiError.badRequest("Missing svix headers")
  //   2. const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET)
  //   3. let evt; try { evt = wh.verify(req.body, headers) } catch { throw ApiError.badRequest("Invalid signature") }
  //      ↑ req.body is a Buffer here because the route uses express.raw()
  //   4. switch (evt.type):
  //        "user.created", "user.updated" → await upsertFromClerk(evt.data)
  //        "user.deleted"                 → await softDeleteByClerkId(evt.data.id)
  //        default → ignore
  //   5. res.status(200).json({ success: true })  — reply fast; Clerk retries on non-2xx
  // HINT: NEVER skip verification — without it, anyone could POST fake "user.created" events.
  //       Search: "clerk webhooks svix verify express", "svix Webhook.verify".
}
