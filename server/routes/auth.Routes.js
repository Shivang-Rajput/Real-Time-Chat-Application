import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/auth.Controller.js";
import protect from "../middleware/auth.Middleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// NEW
router.delete("/delete-account", protect, deleteAccount);

router.get("/test", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed ✅",
    user: req.user,
  });
});

export default router;