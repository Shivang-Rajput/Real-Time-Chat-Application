import express from "express";
import protect from "../middleware/auth.middleware.js";
import { sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// Send Message
router.post("/send/:receiverId", protect, sendMessage);

export default router;