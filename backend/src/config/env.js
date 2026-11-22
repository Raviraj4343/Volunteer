/**
 * config/env.js — loads .env and validates it ONCE at startup.
 *
 * Connects to: almost every file imports { env } from here instead of
 * reading process.env directly. If a variable is missing, the app crashes
 * immediately with a clear message instead of failing mysteriously later.
 */
import "dotenv/config";
import { z } from "zod";

const requiredString = z.string().trim().min(1);
// Env vars are always strings: coerce turns "5000" into 5000.
const positiveInt = z.coerce.number().int().positive();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  // No default on purpose: the server must refuse to start without a PORT.
  PORT: positiveInt.max(65535),
  // "http://a.com, http://b.com" → ["http://a.com", "http://b.com"]
  CLIENT_URLS: requiredString.transform((s) => s.split(",").map((url) => url.trim())),

  // Not z.url(): it rejects valid MongoDB strings that list several hosts.
  MONGODB_URI: requiredString.regex(/^mongodb(\+srv)?:\/\//, "Must start with mongodb:// or mongodb+srv://"),

  CLERK_PUBLISHABLE_KEY: requiredString,
  CLERK_SECRET_KEY: requiredString,
  CLERK_WEBHOOK_SIGNING_SECRET: requiredString,

  CLOUDINARY_CLOUD_NAME: requiredString,
  CLOUDINARY_API_KEY: requiredString,
  CLOUDINARY_API_SECRET: requiredString,

  RATE_LIMIT_WINDOW_MS: positiveInt,
  RATE_LIMIT_MAX: positiveInt,
});

function loadEnv() {
  // safeParse never throws: it returns { success, data } or { success, error }.
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables (check backend/.env):");
    for (const issue of result.error.issues) {
      const name = issue.path.join(".");
      // An unset variable would otherwise read "expected number, received NaN".
      const problem = process.env[name] ? issue.message : "Missing or empty";
      console.error(`  ${name}: ${problem}`);
    }
    process.exit(1);
  }

  return result.data;
}

export const env = loadEnv();
export const isProduction = env.NODE_ENV === "production";
