const express = require("express");
const router = express.Router();

const {
  createConversation,
  getMyConversations,
} = require("../controllers/conversationController");

const { protect } = require("../middleware/authMiddleware");

// Create Conversation
router.post("/", protect, createConversation);

// Get My Conversations
router.get("/", protect, getMyConversations);

module.exports = router;