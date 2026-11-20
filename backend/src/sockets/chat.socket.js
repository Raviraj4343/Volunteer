/**
 * sockets/chat.socket.js — real-time events for mission group chats.
 *
 * Events (client → server):
 *   "chat:join"      { missionId }               → enter the mission's room
 *   "chat:leave"     { missionId }               → leave the room
 *   "message:send"   { missionId, text, clientId } (with ack callback)
 *   "typing"         { missionId, isTyping }
 * Events (server → client):
 *   "message:new"    the saved message
 *   "typing"         { missionId, user, isTyping }
 *
 * Connects to: sockets/index.js (calls registerChatHandlers), services/chat.service.js
 * (assertMember, createMessage), validators/chat.validator.js (sendMessageSchema),
 * services/notification.service.js (notify offline members).
 */
import { assertMember, createMessage } from "../services/chat.service.js";
import { sendMessageSchema } from "../validators/chat.validator.js";

const room = (missionId) => `mission:${missionId}`;

export function registerChatHandlers(io, socket) {
  const user = socket.data.user;

  socket.on("chat:join", async ({ missionId } = {}, ack) => {
    // TODO:
    //   1. await assertMember(missionId, user._id)  ← NEVER let non-members join a room
    //   2. socket.join(room(missionId))
    //   3. ack?.({ ok: true })
    //   4. catch → ack?.({ ok: false, message: err.message })
    // HINT: "ack" = acknowledgement callback: the client passes a function as the last
    //       argument to emit() and gets this reply. Search: "socket.io acknowledgements".
  });

  socket.on("chat:leave", ({ missionId } = {}) => {
    // TODO: socket.leave(room(missionId))
  });

  socket.on("message:send", async (payload, ack) => {
    // TODO:
    //   1. const parsed = sendMessageSchema.safeParse(payload) → invalid? ack({ ok: false, message })
    //   2. const message = await createMessage({ missionId, sender: user, text })
    //      (createMessage also checks membership — don't trust that they joined the room)
    //   3. io.to(room(missionId)).emit("message:new", { ...message, clientId })
    //      ↑ goes to EVERYONE in the room, including the sender's other tabs
    //   4. ack({ ok: true, message })
    //   5. catch → ack({ ok: false, message: "Couldn't send. Try again." })
    // HINT: Add a simple per-socket rate limit (e.g. max 10 messages / 10 s) to stop spam.
  });

  socket.on("typing", ({ missionId, isTyping } = {}) => {
    // TODO: socket.to(room(missionId)).emit("typing", { missionId, user: { _id, name }, isTyping })
    // HINT: socket.to() = everyone in the room EXCEPT this socket. io.to() = everyone.
    //       Only forward if socket.rooms.has(room(missionId)) — cheap membership check.
  });
}
