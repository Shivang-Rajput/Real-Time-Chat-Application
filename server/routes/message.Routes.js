import express from "express";
import protect from "../middleware/auth.Middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  sendMessage,
  getMessages,
  markMessagesSeen,
  deleteMessageForMe,
} from "../controllers/message.Controller.js";

const router = express.Router();

// ==========================================
// Send Message
// POST /api/messages/send/:receiverId
// ==========================================
router.post(
  "/send/:receiverId",
  protect,
  upload.single("image"),
  sendMessage
);

// ==========================================
// Delete Message (Delete For Me)
// DELETE /api/messages/:messageId
// ==========================================
router.delete(
  "/:messageId",
  protect,
  deleteMessageForMe
);

// ==========================================
// Mark Seen
// ==========================================
router.put(
  "/seen/:userId",
  protect,
  markMessagesSeen
);

// ==========================================
// Get Messages
// ==========================================
router.get(
  "/:receiverId",
  protect,
  getMessages
);

export default router;