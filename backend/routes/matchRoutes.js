const express = require("express");
const router = express.Router();

const {
  sendMatchRequest,
  getSentRequests,
  getReceivedRequests,
  getMatchSuggestions,
  acceptMatchRequest,
  rejectMatchRequest,
} = require("../controllers/matchController");


const { protect } = require("../middleware/authMiddleware");

// Send Match Request
router.post("/", protect, sendMatchRequest);

// Get My Sent Requests
router.get("/sent", protect, getSentRequests);

// Get My Received Requests
router.get("/received", protect, getReceivedRequests);

// Mutual Match Suggestions
router.get("/suggestions", protect, getMatchSuggestions);

// Accept Match Request
router.patch("/:id/accept", protect, acceptMatchRequest);

// Reject Match Request
router.patch("/:id/reject", protect, rejectMatchRequest);

module.exports = router;