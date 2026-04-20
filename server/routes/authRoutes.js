import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);

// GOOGLE AUTH
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true });

    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;