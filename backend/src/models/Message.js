/**
 * models/Message.js — one chat message inside a mission's group chat.
 *
 * Connects to:
 *   sockets/chat.socket.js     → creates messages in real time
 *   services/chat.service.js   → saves + loads history (cursor pagination)
 *   controllers/chat.controller.js → GET /missions/:id/messages
 *   models/Mission.js, models/User.js (refs)
 */
import mongoose from "mongoose";
import { CHAT } from "../config/constants.js";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    // mission:
    //   TODO: ObjectId, ref "Mission", required
    //
    // sender:
    //   TODO: ObjectId, ref "User"  (NOT required — system messages have no sender)
    //
    // type:
    //   TODO: String, enum ["text", "image", "system"], default "text"
    //   HINT: "system" = "Rohan joined the mission" — create these in mission.service.js.
    //
    // text:
    //   TODO: String, trim, maxlength CHAT.MAX_MESSAGE_LENGTH
    //   HINT: Required when type is "text" → use required: function () { return this.type === "text"; }
    //
    // imageUrl:
    //   TODO: String, default null
    //
    // deletedAt:
    //   TODO: Date, default null   HINT: Soft delete → frontend shows "Message deleted".
  },
  { timestamps: true }
);

// TODO: index for loading history newest-first, fast:
//   messageSchema.index({ mission: 1, createdAt: -1 })
// HINT: Every history query filters by mission and sorts by createdAt —
//       this compound index serves both. Search: "mongodb compound index sort".

export const Message = mongoose.model("Message", messageSchema);
