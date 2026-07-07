import express from "express";

import {
  registerUser,
  loginUser,
  saveCV,
  getCV,
  updateCV,
  deleteCV,
  analyzeSkills,
  downloadCV
} from "../controllers/userController.js";

import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

/* ===========================
   AUTH
=========================== */
router.post("/register", registerUser);
router.post("/login", loginUser);

/* ===========================
   CV (PROTECTED)
=========================== */
router.post("/cv", verifyToken, saveCV);
router.get("/cv", verifyToken, getCV);
router.put("/cv/:id", verifyToken, updateCV);
router.delete("/cv/:id", verifyToken, deleteCV);

/* ===========================
   DOWNLOAD CV (FIXED 🔥)
=========================== */
router.get("/cv/download", verifyToken, downloadCV);

/* ===========================
   AI SKILLS
=========================== */
router.post("/analyze", verifyToken, analyzeSkills);

export default router;