import express from "express";
import { registerUser, loginUser, logoutUser } from "../controller/authController.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", registerUser);

// POST /api/auth/signin
router.post("/signin", loginUser);

// POST /api/auth/logout
router.post("/logout", logoutUser);

export default router;
