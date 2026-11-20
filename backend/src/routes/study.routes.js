/**
 * routes/study.routes.js — /api/study: study profile + matches.
 *
 * Connects to: middlewares/auth.js, middlewares/validate.js,
 * validators/study.validator.js, controllers/study.controller.js.
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { upsertStudyProfileBody, studyMatchesQuery } from "../validators/study.validator.js";
import * as study from "../controllers/study.controller.js";

const router = Router();

router.use(requireUser);

// TODO:
//   GET  /profile   → study.getMyProfile
//   PUT  /profile   → validate({ body: upsertStudyProfileBody }), study.upsertMyProfile
//   GET  /matches   → validate({ query: studyMatchesQuery }), study.getMatches

export default router;
