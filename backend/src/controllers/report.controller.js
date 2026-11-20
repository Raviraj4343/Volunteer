/**
 * controllers/report.controller.js — users reporting missions, people or messages.
 *
 * Connects to: services/report.service.js, utils/apiResponse.js.
 * Used by: routes/report.routes.js. Frontend: features/safety/ReportDialog.jsx.
 */
import * as reportService from "../services/report.service.js";
import { sendCreated } from "../utils/apiResponse.js";

// POST /api/reports
export async function createReport(req, res) {
  // TODO: reportService.createReport(req.user._id, req.validated.body)
  //       → sendCreated(res, { ok: true }, "Thanks for letting us know")
  // HINT: The frontend only checks success; it shows its own toast text.
}
