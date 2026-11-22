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
import { /* connectDB, */ disconnectDB } from "./config/db.js";
import { createApp } from "./app.js";
// import { initSocket } from "./sockets/index.js";

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function start() {
  try {
    // Step 2: uncomment this and connectDB in the import above.
    // await connectDB();

    const app = createApp();
    // Socket.io must share this server, so don't use app.listen().
    const server = http.createServer(app);

    // Step 5: uncomment these and the initSocket import above.
    // const io = initSocket(server);
    // app.set("io", io);

    // listen() reports failures (like a busy port) as events, so try/catch can't see them.
    server.on("error", (error) => crash("Server error", error));
    server.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });

    const onSignal = shutdown(server);
    process.on("SIGINT", onSignal); // Ctrl+C
    process.on("SIGTERM", onSignal); // sent by hosting platforms
  } catch (error) {
    crash("Failed to start", error);
  }
}

// Graceful shutdown: let in-flight requests finish before closing the DB.
function shutdown(server) {
  let shuttingDown = false;

  return async () => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log("Shutting down…");

    // close() waits for open requests, so don't let a stuck one block the exit forever.
    setTimeout(() => {
      console.error("Shutdown timed out, forcing exit.");
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS).unref();

    try {
      // close() uses a callback, so wrap it in a Promise to await it.
      await new Promise((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
      await disconnectDB();
      process.exit(0);
    } catch (error) {
      crash("Shutdown failed", error);
    }
  };
}

function crash(reason, error) {
  console.error(`${reason}:`, error);
  process.exit(1);
}

// A crashed process should restart, not limp on.
process.on("unhandledRejection", (error) => crash("Unhandled rejection", error));
process.on("uncaughtException", (error) => crash("Uncaught exception", error));

start();
