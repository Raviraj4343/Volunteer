/**
 * validators/rating.validator.js — rules for rating fellow members after a mission.
 *
 * Connects to: routes/mission.routes.js (POST /missions/:id/ratings), common.validator.js.
 */
import { z } from "zod";
import { objectId } from "./common.validator.js";

// POST /missions/:id/ratings — rate several members at once
export const submitRatingsBody = z.object({
  // TODO:
  //   ratings: array (1–50) of {
  //     rateeId:  objectId,
  //     score:    int 1–5,
  //     showedUp: boolean,
  //     comment:  string max 300, optional
  //   }
  // HINT: Also reject duplicates of the same rateeId in one request (.superRefine).
});
