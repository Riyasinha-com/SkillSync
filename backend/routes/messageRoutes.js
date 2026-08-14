const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

// ==========================
// Send Message
// ==========================
router.post("/", protect, sendMessage);

// ==========================
// Get Messages
// ==========================
router.get("/:conversationId", protect, getMessages);

module.exports = router;