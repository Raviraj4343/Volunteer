/**
 * validators/chat.validator.js — rules for chat history (REST) and for
 * messages arriving over Socket.io.
 *
 * Connects to: routes/chat.routes.js, sockets/chat.socket.js, config/constants.js.
 * ⚠️ Socket events skip Express middleware entirely — so the socket handler must
 *    call sendMessageSchema.safeParse() ITSELF.
 */
import { z } from "zod";
import { CHAT } from "../config/constants.js";
import { objectId } from "./common.validator.js";

// GET /missions/:id/messages?before=<messageId>&limit=30
export const messageHistoryQuery = z.object({
  // TODO:
  //   before: objectId, optional   ← cursor: "give me messages older than this one"
  //   limit:  z.coerce.number().int().min(1).max(50).default(CHAT.HISTORY_PAGE_SIZE)
});

// socket event "message:send" payload
export const sendMessageSchema = z.object({
  // TODO:
  //   missionId: objectId
  //   text:      string, trim, 1..CHAT.MAX_MESSAGE_LENGTH
  //   clientId:  string, optional ← temporary id from the frontend so it can replace its
  //                                 "sending…" bubble with the saved message
});
