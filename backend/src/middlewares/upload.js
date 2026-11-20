/**
 * middlewares/upload.js — accepts an image file in a multipart/form-data
 * request and keeps it in memory, ready to stream to Cloudinary.
 *
 * Connects to: multer, routes/upload.routes.js,
 * services/upload.service.js (sends req.file.buffer to Cloudinary).
 */
import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function fileFilter(req, file, cb) {
  // TODO: if ALLOWED_TYPES includes file.mimetype → cb(null, true)
  //       else cb(ApiError.badRequest("Only JPG, PNG or WebP images are allowed."))
}

// TODO: configure multer:
//   storage: multer.memoryStorage()   — no temp files on disk
//   limits:  { fileSize: MAX_SIZE_MB * 1024 * 1024 }
//   fileFilter
// HINT: Search "multer memoryStorage", "multer limits fileSize".
//       A too-big file throws a MulterError with code "LIMIT_FILE_SIZE" —
//       handle it in errorHandler.js (return 413).
export const uploadImage = multer({
  // TODO
}).single("image"); // the form field name the frontend must use
