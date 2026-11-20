/**
 * routes/user.routes.js — /api/users: my profile, impact stats, public profiles, blocking.
 *
 * Connects to: middlewares/auth.js, middlewares/validate.js,
 * validators/user.validator.js, controllers/user.controller.js.
 * Frontend already calls: POST /users/:id/block (BlockUserDialog.jsx)
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { userIdParams, updateMeBody } from "../validators/user.validator.js";
import * as users from "../controllers/user.controller.js";

const router = Router();

router.use(requireUser);

// TODO:
//   GET    /me             → users.getMe
//   PATCH  /me             → validate({ body: updateMeBody }), users.updateMe
//   GET    /me/stats       → users.getMyStats
//   GET    /:id            → validate({ params: userIdParams }), users.getUser
//   GET    /:id/ratings    → validate({ params: userIdParams }), users.getUserRatings
//   POST   /:id/block      → validate({ params: userIdParams }), users.blockUser
//   DELETE /:id/block      → validate({ params: userIdParams }), users.unblockUser
// HINT: "/me" routes BEFORE "/:id" routes.

export default router;
