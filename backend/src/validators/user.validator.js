/**
 * validators/user.validator.js — input rules for profile endpoints.
 *
 * Connects to: routes/user.routes.js, validators/common.validator.js.
 */
import { z } from "zod";
import { idParams, latLng } from "./common.validator.js";

export const userIdParams = idParams;

// PATCH /users/me
export const updateMeBody = z.object({
  // TODO: only fields a user may edit themselves:
  //   bio (max 280), city (max 60), homeLocation (latLng, optional)
  // HINT: name/avatar are managed in Clerk (they arrive via the webhook) —
  //       don't accept them here. NEVER accept role, isBanned, stats, reliability!
  //       .strict() makes that impossible.
});
