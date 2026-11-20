/**
 * routes/mission.routes.js — URL → middleware → controller for /api/missions.
 *
 * Connects to: middlewares/auth.js, middlewares/validate.js, middlewares/rateLimiter.js,
 * validators/mission.validator.js, validators/rating.validator.js,
 * controllers/mission.controller.js, controllers/rating.controller.js.
 *
 * Endpoints the frontend already calls (frontend/src/services/api/index.js):
 *   GET  /missions           POST /missions
 *   GET  /missions/:id       POST /missions/:id/join     POST /missions/:id/leave
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { writeLimiter } from "../middlewares/rateLimiter.js";
import {
  listMissionsQuery,
  missionIdParams,
  missionDetailsQuery,
  createMissionBody,
  updateMissionBody,
  checkInBody,
} from "../validators/mission.validator.js";
import { submitRatingsBody } from "../validators/rating.validator.js";
import * as missions from "../controllers/mission.controller.js";
import * as ratings from "../controllers/rating.controller.js";

const router = Router();

// Every mission route needs a signed-in user.
router.use(requireUser);

// ✅ EXAMPLE — the pattern for every route: path, validation, controller
router.get("/", validate({ query: listMissionsQuery }), missions.listMissions);

// TODO: wire up the rest following the example above:
//   GET    /mine                   → missions.listMyMissions
//   GET    /:id                    → validate({ params: missionIdParams, query: missionDetailsQuery }), missions.getMission
//   POST   /                       → writeLimiter, validate({ body: createMissionBody }), missions.createMission
//   PATCH  /:id                    → validate({ params, body: updateMissionBody }), missions.updateMission
//   DELETE /:id                    → validate({ params }), missions.cancelMission
//   POST   /:id/join               → missions.joinMission
//   POST   /:id/leave              → missions.leaveMission
//   POST   /:id/check-in           → validate({ params, body: checkInBody }), missions.checkIn
//   POST   /:id/ratings            → validate({ params, body: submitRatingsBody }), ratings.submitRatings
// HINT: ORDER MATTERS — put "/mine" BEFORE "/:id", or Express will treat "mine" as an id.

export default router;
