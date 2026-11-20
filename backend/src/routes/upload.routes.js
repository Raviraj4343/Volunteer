/**
 * routes/upload.routes.js — /api/uploads: image uploads to Cloudinary.
 *
 * Connects to: middlewares/auth.js, middlewares/rateLimiter.js,
 * middlewares/upload.js (multer), controllers/upload.controller.js.
 */
import { Router } from "express";
import { requireUser } from "../middlewares/auth.js";
import { writeLimiter } from "../middlewares/rateLimiter.js";
import { uploadImage as parseImage } from "../middlewares/upload.js";
import * as uploads from "../controllers/upload.controller.js";

const router = Router();

router.use(requireUser);

// TODO:
//   POST /image   → writeLimiter, parseImage, uploads.uploadImage
// HINT: Test in Postman with Body → form-data → key "image" (type: File).

export default router;
