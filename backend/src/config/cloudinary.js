/**
 * config/cloudinary.js — configures the Cloudinary SDK once.
 *
 * Connects to: config/env.js (keys), services/upload.service.js (uses `cloudinary`
 * to upload/delete images).
 */
import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";

// TODO: call cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
//       using the three CLOUDINARY_* values from env.
// HINT: This runs once when the file is first imported. Search: "cloudinary node v2 config".

export { cloudinary };
