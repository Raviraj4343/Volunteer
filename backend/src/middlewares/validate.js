/**
 * middlewares/validate.js — runs a Zod schema against req.body / req.query /
 * req.params BEFORE the controller. Controllers can then trust their input.
 *
 * Connects to: validators/*.js (the schemas), utils/ApiError.js.
 * Used in routes like:
 *   router.post("/", validate({ body: createMissionSchema }), createMission)
 */
import { ApiError } from "../utils/ApiError.js";

export function validate(schemas) {
  // `schemas` looks like { body?, query?, params? } — each a Zod schema.
  return (req, res, next) => {
    // TODO:
    //   1. for each key in ["params", "query", "body"] that has a schema:
    //        const result = schemas[key].safeParse(req[key])
    //   2. if !result.success → collect errors as [{ field: issue.path.join("."), message: issue.message }]
    //   3. if any errors → throw ApiError.unprocessable("Some fields are invalid.", errors)
    //   4. store parsed values: req.validated = { ...req.validated, [key]: result.data }
    //      (parsed data has defaults applied and strings coerced to numbers)
    //   5. next()
    // HINT: In Express 5, req.query is read-only — that's why we store into
    //       req.validated instead of overwriting req.query.
    //       Search: "zod safeParse issues path", "express 5 req.query getter".
  };
}
