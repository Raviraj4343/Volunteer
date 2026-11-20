/**
 * routes/index.js — mounts every feature router under /api.
 *
 * Connects to: all *.routes.js files in this folder. Mounted in app.js as
 *   app.use("/api", apiLimiter, apiRoutes)
 * so "/missions" here becomes "/api/missions".
 *
 * (webhook.routes.js is NOT mounted here — it must be mounted in app.js
 *  before express.json(); see app.js.)
 */
import { Router } from "express";
import missionRoutes from "./mission.routes.js";
import chatRoutes from "./chat.routes.js";
import userRoutes from "./user.routes.js";
import studyRoutes from "./study.routes.js";
import notificationRoutes from "./notification.routes.js";
import reportRoutes from "./report.routes.js";
import uploadRoutes from "./upload.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

// TODO: mount each router on its path:
//   router.use("/missions", missionRoutes)
//   router.use("/missions", chatRoutes)        ← chat history lives at /missions/:id/messages
//   router.use("/messages", chatRoutes)        ← or give message deletion its own router — your call
//   router.use("/users", userRoutes)
//   router.use("/study", studyRoutes)
//   router.use("/notifications", notificationRoutes)
//   router.use("/reports", reportRoutes)
//   router.use("/uploads", uploadRoutes)
//   router.use("/admin", adminRoutes)
// HINT: Search "express Router mounting".

export default router;
