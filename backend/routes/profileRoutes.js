const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  exploreUsers,
  getUserById,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

// Explore Users
router.get("/explore", protect, exploreUsers);

// Get User By ID
router.get("/:id", protect, getUserById);

// Get Logged-in User Profile
router.get("/", protect, getProfile);

// Update Logged-in User Profile
router.put("/", protect, updateProfile);

module.exports = router;