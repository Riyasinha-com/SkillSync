const express = require("express");
const router = express.Router();

const {
  addSkill,
  getMySkills,
  getSkillsByUser,
  exploreSkills,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const { protect } = require("../middleware/authMiddleware");

// Add Skill
router.post("/", protect, addSkill);

// Get My Skills
router.get("/", protect, getMySkills);

// Get Skills By User ID
router.get("/user/:userId", protect, getSkillsByUser);

// Explore Skills
router.get("/explore", protect, exploreSkills);

// Update Skill
router.put("/:id", protect, updateSkill);

// Delete Skill
router.delete("/:id", protect, deleteSkill);

module.exports = router;