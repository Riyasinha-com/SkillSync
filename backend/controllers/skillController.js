const Skill = require("../models/Skill");

// ==========================
// Add Skill
// ==========================
const addSkill = async (req, res) => {
  try {
    const { title, category, level, description, type, yearsOfExperience } =
      req.body;

    const skill = await Skill.create({
      title,
      category,
      level,
      description,
      type,
      yearsOfExperience,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
  console.error("========== ADD SKILL ERROR ==========");
  console.error(error);
  console.error("Request Body:", req.body);
  console.error("User:", req.user);

  res.status(500).json({
    message: error.message,
  });
}
};

// ==========================
// Get My Skills
// ==========================
const getMySkills = async (req, res) => {
  try {
    const skills = await Skill.find({
      owner: req.user.id,
    });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Skills By User ID
// ==========================
const getSkillsByUser = async (req, res) => {
  try {
    const skills = await Skill.find({
      owner: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Explore Skills
// ==========================
const exploreSkills = async (req, res) => {
  try {
    const skills = await Skill.find({
      owner: { $ne: req.user.id },
      isAvailable: true,
    })
      .populate("owner", "name profilePic city")
      .sort({ createdAt: -1 });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Skill
// ==========================
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    // Check ownership
    if (skill.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this skill",
      });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json({
      message: "Skill updated successfully",
      skill: updatedSkill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Skill
// ==========================
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    // Check ownership
    if (skill.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this skill",
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addSkill,
  getMySkills,
  getSkillsByUser,
  exploreSkills,
  updateSkill,
  deleteSkill,
};