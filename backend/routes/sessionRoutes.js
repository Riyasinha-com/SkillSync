const express = require("express");
const router = express.Router();

const {
  createSession,
  getMySessions,
  updateSession,
  completeSession,
} = require("../controllers/sessionController");

const { protect } = require("../middleware/authMiddleware");

// Create Session
router.post("/", protect, createSession);

// Get My Sessions
router.get("/", protect, getMySessions);

// Update Session
router.put("/:id", protect, updateSession);

// Complete Session
router.patch("/:id/complete", protect, completeSession);

module.exports = router;