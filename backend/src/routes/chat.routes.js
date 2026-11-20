/**
 * routes/chat.routes.js — REST endpoints for chat (history + delete).
 * Live messages go through Socket.io instead — see sockets/chat.socket.js.
 *
 * Connects to: middlewares/auth.js, middlewares/validate.js,
 * validators/chat.validator.js, validators/common.validator.js,
 * controllers/chat.controller.js. Mounted in routes/index.js.
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { idParams } from "../validators/common.validator.js";
import { messageHistoryQuery } from "../validators/chat.validator.js";
import * as chat from "../controllers/chat.controller.js";

const router = Router();

router.use(requireUser);

// TODO:
//   GET    /:id/messages   → validate({ params: idParams, query: messageHistoryQuery }), chat.getMessages
//   DELETE /:id            → (when mounted on /messages) validate({ params: idParams }), chat.deleteMessage
// HINT: If one router is mounted on two paths, both routes exist on both paths.
//       Cleaner: split into two small routers, or mount once and use full paths.

export default router;
