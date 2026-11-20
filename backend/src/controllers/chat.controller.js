/**
 * controllers/chat.controller.js — REST side of chat: loading message history.
 * Sending messages happens over Socket.io (sockets/chat.socket.js), not REST.
 *
 * Connects to: services/chat.service.js, utils/apiResponse.js.
 * Used by: routes/chat.routes.js.
 */
import * as chatService from "../services/chat.service.js";
import { sendSuccess } from "../utils/apiResponse.js";

// GET /api/missions/:id/messages?before=<messageId>&limit=30
export async function getMessages(req, res) {
  // TODO:
  //   1. const { before, limit } = req.validated.query
  //   2. const result = await chatService.getHistory(req.validated.params.id, req.user, { before, limit })
  //   3. sendSuccess(res, result.items, { meta: { nextCursor: result.nextCursor, hasMore: result.hasMore } })
  // HINT: The frontend calls this again with ?before=<oldest id> when the user scrolls up.
}

// DELETE /api/messages/:messageId
export async function deleteMessage(req, res) {
  // TODO:
  //   1. chatService.deleteMessage(messageId, req.user)
  //   2. req.app.get("io").to(`mission:${missionId}`).emit("message:deleted", { id })
  //   3. sendSuccess(res, null, { message: "Message deleted" })
}
