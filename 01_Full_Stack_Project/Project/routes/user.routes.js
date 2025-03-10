import express from "express";
import { 
  registerUser, 
  loginUser, 
  verifyEmail, 
  requestPasswordReset, 
  resetPassword, 
  getCurrentUser, 
  logoutUser 
} from "../controller/user.controller.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);
router.get("/me", getCurrentUser);
router.post("/logout", logoutUser);

export default router;
