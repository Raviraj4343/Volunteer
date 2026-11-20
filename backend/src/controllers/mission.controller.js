/**
 * controllers/mission.controller.js — HTTP layer for missions.
 * A controller should be SHORT: read validated input → call a service → send a response.
 * No database queries here — those live in services/mission.service.js.
 *
 * Connects to: services/mission.service.js, utils/apiResponse.js, utils/pagination.js.
 * Used by: routes/mission.routes.js.
 *
 * Inputs come from middlewares/validate.js → req.validated.{params,query,body}
 * The user comes from middlewares/auth.js → req.user
 */
import * as missionService from "../services/mission.service.js";
import { sendSuccess, sendCreated } from "../utils/apiResponse.js";
import { getPagination } from "../utils/pagination.js";
import { parseOrigin } from "../utils/geo.js";

// GET /api/missions
export async function listMissions(req, res) {
  // TODO:
  //   1. const query = req.validated.query
  //   2. const result = await missionService.listMissions({ ...query, ...getPagination(query) }, req.user)
  //   3. sendSuccess(res, { items: result.items, total: result.total }, { meta: result.meta })
  // HINT: The frontend reads data.items and data.total (see frontend HomePage.jsx).
  //       Express 5 sends thrown/rejected errors to errorHandler for you.
}

// GET /api/missions/:id
export async function getMission(req, res) {
  // TODO: missionService.getMissionById(id, req.user, parseOrigin(req.validated.query)) → sendSuccess
}

// POST /api/missions
export async function createMission(req, res) {
  // TODO: missionService.createMission(req.validated.body, req.user) → sendCreated(res, mission, "Mission created")
}

// PATCH /api/missions/:id
export async function updateMission(req, res) {
  // TODO: missionService.updateMission(id, req.validated.body, req.user) → sendSuccess
}

// DELETE /api/missions/:id  (cancels — doesn't hard-delete)
export async function cancelMission(req, res) {
  // TODO: missionService.cancelMission(id, req.user, req.body?.reason) → sendSuccess(res, null, { message: "Mission cancelled" })
}

// POST /api/missions/:id/join
export async function joinMission(req, res) {
  // TODO:
  //   1. const mission = await missionService.joinMission(id, req.user)
  //   2. (optional) req.app.get("io").to(`mission:${id}`).emit("mission:updated", { id, membersCount })
  //   3. sendSuccess(res, mission, { message: "You're in!" })
}

// POST /api/missions/:id/leave
export async function leaveMission(req, res) {
  // TODO: missionService.leaveMission(id, req.user) → sendSuccess
}

// POST /api/missions/:id/check-in
export async function checkIn(req, res) {
  // TODO: missionService.checkIn(id, req.user, req.validated.body) → sendSuccess(..., { message: "Checked in. Thank you for showing up!" })
}

// GET /api/missions/mine?scope=upcoming|past
export async function listMyMissions(req, res) {
  // TODO: missionService.listMyMissions(req.user, { scope: req.query.scope, ...getPagination(req.query) })
}
