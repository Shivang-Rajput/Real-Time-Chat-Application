import express from "express";
import protect from "../middleware/auth.Middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// ==========================================
// Get All Users
// GET /api/users
// ==========================================
router.get("/", protect, getUsers);

// ==========================================
// Update Profile
// PUT /api/users/profile
// ==========================================
router.put(
  "/profile",
  protect,
  upload.single("avatar"),
  updateProfile
);

export default router;