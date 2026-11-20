/**
 * sockets/index.js — creates the Socket.io server, authenticates every
 * connection with Clerk, and registers event handlers.
 *
 * Rooms used in this app:
 *   `user:<userId>`       → personal room (notifications to all of a user's tabs)
 *   `mission:<missionId>` → one room per mission group chat
 *
 * Connects to: server.js (initSocket(server)), config/env.js (CLIENT_URLS for CORS),
 * @clerk/express (verifyToken), models/User.js, sockets/chat.socket.js,
 * services/notification.service.js (uses getIO() to push notifications).
 */
import { Server } from "socket.io";
import { verifyToken } from "@clerk/express";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { registerChatHandlers } from "./chat.socket.js";

let io = null;

/** Lets services emit events without passing `io` around. Returns null before init. */
export function getIO() {
  return io;
}

/** Socket.io middleware: runs once per connection, BEFORE "connection". */
async function authenticateSocket(socket, next) {
  // TODO:
  //   1. const token = socket.handshake.auth?.token
  //      (frontend connects with: io(URL, { auth: async (cb) => cb({ token: await getToken() }) }))
  //   2. no token → next(new Error("unauthorized"))
  //   3. const payload = await verifyToken(token, { secretKey: env.CLERK_SECRET_KEY })
  //   4. const user = await User.findOne({ clerkId: payload.sub })  → banned/missing → next(new Error("unauthorized"))
  //   5. socket.data.user = { _id, name, avatarUrl }; next()
  //   6. wrap in try/catch → next(new Error("unauthorized"))
  // HINT: Express middleware does NOT run for sockets — this is the socket equivalent of requireUser.
  //       Search: "socket.io middleware io.use", "clerk verifyToken".
}

export function initSocket(httpServer) {
  // TODO:
  //   1. io = new Server(httpServer, { cors: { origin: env.CLIENT_URLS, credentials: true } })
  //   2. io.use(authenticateSocket)
  //   3. io.on("connection", (socket) => {
  //        socket.join(`user:${socket.data.user._id}`)    ← personal room
  //        registerChatHandlers(io, socket)
  //        socket.on("disconnect", (reason) => …log…)
  //      })
  //   4. return io
  // HINT: Search "socket.io rooms", "socket.io cors".
  //       Scaling to many servers later? Search "socket.io redis adapter".
  return io;
}
