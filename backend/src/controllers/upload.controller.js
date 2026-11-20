/**
 * controllers/upload.controller.js — receives an image and returns its Cloudinary URL.
 *
 * Connects to: middlewares/upload.js (puts the file in req.file),
 * services/upload.service.js, utils/apiResponse.js.
 * Used by: routes/upload.routes.js.
 *
 * Flow: frontend uploads the image FIRST → gets { url, publicId } →
 *       then sends those inside POST /missions as coverImage.
 */
import { uploadImageBuffer } from "../services/upload.service.js";
import { sendCreated } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// POST /api/uploads/image   (multipart/form-data, field name "image")
export async function uploadImage(req, res) {
  // TODO:
  //   1. if (!req.file) throw ApiError.badRequest("Please choose an image.")
  //   2. const image = await uploadImageBuffer(req.file.buffer, { folder: `volunteer/${req.user._id}` })
  //   3. sendCreated(res, image, "Image uploaded")
}
