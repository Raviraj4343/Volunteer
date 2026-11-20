/**
 * services/upload.service.js — sends image buffers to Cloudinary and deletes old ones.
 *
 * Connects to: config/cloudinary.js, middlewares/upload.js (gives us req.file.buffer).
 * Used by: controllers/upload.controller.js (and mission.service when a cover is replaced).
 */
import { cloudinary } from "../config/cloudinary.js";

export function uploadImageBuffer(buffer, { folder = "volunteer/missions" } = {}) {
  // TODO: return a Promise that resolves to { url: result.secure_url, publicId: result.public_id }
  //   1. const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image",
  //        transformation: [{ width: 1600, crop: "limit", quality: "auto", fetch_format: "auto" }] },
  //        (error, result) => error ? reject(error) : resolve(...))
  //   2. stream.end(buffer)
  // HINT: upload_stream uses a callback, so wrap it in `new Promise((resolve, reject) => …)`.
  //       Search: "cloudinary upload_stream buffer promise".
}

export async function deleteImage(publicId) {
  // TODO: if publicId → await cloudinary.uploader.destroy(publicId)
}
