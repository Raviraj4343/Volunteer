/**
 * validators/mission.validator.js — input rules for mission endpoints.
 *
 * Connects to: routes/mission.routes.js (validate({...})), config/constants.js,
 * validators/common.validator.js.
 * Must accept exactly what the frontend sends — see:
 *   frontend/src/services/api/index.js (missionsApi)
 *   frontend/src/config/site.js        (DISTANCE_OPTIONS, DATE_OPTIONS)
 */
import { z } from "zod";
import { MISSION_CATEGORIES, DATE_FILTERS, DISTANCE_FILTERS_KM, STUDY_LEVELS } from "../config/constants.js";
import { idParams, paginationQuery } from "./common.validator.js";

// GET /missions?category=&distance=&date=&q=&lat=&lng=&page=&limit=
export const listMissionsQuery = paginationQuery.extend({
  // TODO:
  //   category: z.enum(["all", ...MISSION_CATEGORIES]).default("all")
  //   distance: z.enum(DISTANCE_FILTERS_KM).default("10")   ← km as a string, "any" = no limit
  //   date:     z.enum(DATE_FILTERS).default("any")
  //   q:        z.string().trim().max(100).optional()
  //   lat, lng: z.coerce.number() with ranges, optional (no location → no distance filter)
  // HINT: Add .refine() so lat and lng are either BOTH present or both missing.
});

// GET /missions/:id?lat=&lng=
export const missionIdParams = idParams;
export const missionDetailsQuery = z.object({
  // TODO: optional lat/lng (used to compute distanceKm on the details page)
});

// POST /missions
export const createMissionBody = z.object({
  // TODO:
  //   title:         string, trim, 5–100 chars
  //   description:   string, max 2000, optional
  //   category:      z.enum(MISSION_CATEGORIES)
  //   location:      z.object({ name, area?, city, lat, lng })
  //   startsAt:      z.coerce.date() + .refine(d => d > new Date(), "Pick a future date")
  //   durationHours: number 0.5–24
  //   spotsTotal:    int 2–500
  //   requirements:  array of strings, max 10, default []
  //   tags:          array of strings, max 8, default []
  //   urgent:        boolean, default false
  //   study:         optional z.object({ subject, exam, level: z.enum(STUDY_LEVELS) })
  //   coverImage:    optional { url, publicId } (from POST /uploads/image)
  // HINT: .strict() rejects unknown fields — stops people from sending { host: "someone-else" }.
  //       Search: "zod strict", "zod coerce date", "zod refine".
});

// PATCH /missions/:id — every field optional
// TODO: createMissionBody.partial() — but think: should the host be able to lower
//       spotsTotal below the current member count? (Check that in the service.)
export const updateMissionBody = z.object({});

// POST /missions/:id/check-in
export const checkInBody = z.object({
  // TODO: lat, lng — the member's current position. The service checks they are
  //       within ~300 m of the mission. HINT: $geoNear or utils/geo distance.
});
