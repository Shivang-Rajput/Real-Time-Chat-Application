import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/test", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed ✅",
  });
});

export default router;