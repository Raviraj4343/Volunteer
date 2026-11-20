/**
 * server.js — the entry point. Starts everything in the right order.
 *
 * Connects to:
 *   config/env.js   → validated environment variables (PORT, etc.)
 *   config/db.js    → connectDB() / disconnectDB()
 *   app.js          → the Express app (routes + middleware)
 *   sockets/index.js→ initSocket() attaches Socket.io to the SAME http server
 *
 * Why a separate server.js and app.js? app.js only builds the app, so later
 * you can import it in tests without opening a real port.
 */
import http from "node:http";
import { env } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { createApp } from "./app.js";
import { initSocket } from "./sockets/index.js";

async function start() {
  // TODO:
  //   1. await connectDB() — don't accept requests before the DB is ready
  //   2. const app = createApp()
  //   3. const server = http.createServer(app)
  //   4. const io = initSocket(server) and app.set("io", io) so controllers can emit events
  //   5. server.listen(env.PORT, () => console.log(...))
  //   6. Register shutdown(server) for "SIGINT" and "SIGTERM"
  //   7. Wrap in try/catch: on failure, log the error and process.exit(1)
  // HINT: Socket.io must share the http server with Express — that's why we
  //       create it with http.createServer() instead of calling app.listen().
  //       Search: "socket.io with express http.createServer"
}

function shutdown(server) {
  // TODO: return a function that:
  //   1. logs "Shutting down…"
  //   2. calls server.close() (stops accepting new connections)
  //   3. awaits disconnectDB()
  //   4. process.exit(0)
  // HINT: this is "graceful shutdown" — hosting platforms send SIGTERM before
  //       killing your app, so finish in-flight requests first.
}

// TODO: handle crashes you didn't catch:
//   process.on("unhandledRejection", ...) and process.on("uncaughtException", ...)
//   → log the error and exit(1). A crashed process should restart, not limp on.

start();
