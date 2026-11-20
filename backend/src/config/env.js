/**
 * config/env.js — loads .env and validates it ONCE at startup.
 *
 * Connects to: almost every file imports { env } from here instead of
 * reading process.env directly. If a variable is missing, the app crashes
 * immediately with a clear message instead of failing mysteriously later.
 */
import "dotenv/config";
import { z } from "zod";

// TODO: finish this schema — one entry per variable in .env.example
// HINT: z.coerce.number() turns "5000" (env vars are always strings) into 5000.
// HINT: CLIENT_URLS → z.string().transform((s) => s.split(",").map((u) => u.trim()))
// HINT: z.enum(["development", "production", "test"]).default("development") for NODE_ENV
const envSchema = z.object({
  // NODE_ENV: ...,
  // PORT: ...,
  // CLIENT_URLS: ...,
  // MONGODB_URI: z.string().url() ...,
  // CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_WEBHOOK_SIGNING_SECRET: ...,
  // CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: ...,
  // RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX: ...,
});

function loadEnv() {
  // TODO:
  //   1. const result = envSchema.safeParse(process.env)
  //   2. if (!result.success): print each issue (result.error.issues) and process.exit(1)
  //   3. return result.data
  // HINT: safeParse never throws — it returns { success, data } or { success, error }.
  //       Search: "zod safeParse", "zod coerce".
}

export const env = loadEnv();
export const isProduction = env?.NODE_ENV === "production";
