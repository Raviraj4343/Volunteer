/**
 * validators/common.validator.js — small reusable Zod pieces that other
 * validators build on (ids, pagination, coordinates).
 *
 * Connects to: every other file in validators/, middlewares/validate.js.
 */
import { z } from "zod";
import mongoose from "mongoose";
import { PAGINATION } from "../config/constants.js";

// TODO: a string that must be a valid MongoDB ObjectId
// HINT: z.string().refine((v) => mongoose.isValidObjectId(v), { message: "Invalid id" })
//       Validating ids early turns "CastError" crashes into clean 400/422 responses.
export const objectId = z.string();

// TODO: params schema for routes like /missions/:id
// HINT: z.object({ id: objectId })
export const idParams = z.object({});

// TODO: ?page=&limit=
// HINT: z.coerce.number().int().min(1).default(1) for page;
//       limit max PAGINATION.MAX_LIMIT, default PAGINATION.DEFAULT_LIMIT.
//       z.coerce is needed because query strings are always strings.
export const paginationQuery = z.object({});

// TODO: { lat, lng } with ranges -90..90 / -180..180 (use z.coerce.number() for query strings)
export const latLng = z.object({});
