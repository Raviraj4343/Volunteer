/**
 * validators/study.validator.js — input rules for study-mate finder.
 *
 * Connects to: routes/study.routes.js, config/constants.js.
 */
import { z } from "zod";
import { STUDY_LEVELS, WEEKDAYS, TIME_SLOTS } from "../config/constants.js";
import { paginationQuery, latLng } from "./common.validator.js";

// PUT /study/profile
export const upsertStudyProfileBody = z.object({
  // TODO:
  //   subjects:     array of trimmed strings, 1–10
  //   exam:         string, optional
  //   level:        z.enum(STUDY_LEVELS)
  //   availability: array of { day: z.enum(WEEKDAYS), slots: z.array(z.enum(TIME_SLOTS)).min(1) }
  //   mode:         z.enum(["in_person", "online", "either"])
  //   location:     latLng (required if mode is "in_person")
  //   bio:          max 280, optional
  //   isActive:     boolean, optional
  // HINT: For "required only if…" rules use .superRefine(). Search: "zod superRefine".
});

// GET /study/matches?subject=&exam=&level=&distance=&page=&limit=
export const studyMatchesQuery = paginationQuery.extend({
  // TODO: optional filters that override the user's own profile: subject, exam, level, distance (km)
});
