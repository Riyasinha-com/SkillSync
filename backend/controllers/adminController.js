const User = require("../models/User");
const Skill = require("../models/Skill");
const Match = require("../models/Match");
const Session = require("../models/Session");
const Review = require("../models/Review");
const Conversation = require("../models/Conversation");

// ==========================
// Admin Dashboard
// ==========================
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSkills = await Skill.countDocuments();
    const totalMatches = await Match.countDocuments();
    const totalSessions = await Session.countDocuments();
    const totalReviews = await Review.countDocuments();
    const totalConversations = await Conversation.countDocuments();

    res.status(200).json({
      totalUsers,
      totalSkills,
      totalMatches,
      totalSessions,
      totalReviews,
      totalConversations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Users
// ==========================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update User Status
// ==========================
const updateUserStatus = async (req, res) => {
  try {
    const { isSuspended } = req.body;

    if (typeof isSuspended !== "boolean") {
      return res.status(400).json({
        message: "isSuspended must be true or false",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent admin from suspending themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot change your own admin status",
      });
    }

    user.isSuspended = isSuspended;
    await user.save();

    res.status(200).json({
      message: isSuspended
        ? "User suspended successfully"
        : "User activated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        isAdmin: user.isAdmin,
        isSuspended: user.isSuspended,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete User
// ==========================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Skills
// ==========================
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Verify / Reject Skill
// ==========================
const updateSkillVerification = async (req, res) => {
  try {
    const { verified } = req.body;

    if (typeof verified !== "boolean") {
      return res.status(400).json({
        message: "verified must be true or false",
      });
    }

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    skill.verified = verified;
    await skill.save();

    res.status(200).json({
      message: verified
        ? "Skill verified successfully"
        : "Skill verification rejected",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Matches
// ==========================
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .populate("senderSkill", "title")
      .populate("receiverSkill", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Sessions
// ==========================
const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("teacher", "name email profilePic")
      .populate("learner", "name email profilePic")
      .populate({
        path: "match",
        populate: [
          {
            path: "senderSkill",
            select: "title",
          },
          {
            path: "receiverSkill",
            select: "title",
          },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Reviews
// ==========================
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("reviewer", "name email")
      .populate("reviewee", "name email")
      .populate("session")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Review
// ==========================
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllSkills,
  updateSkillVerification,
  getAllMatches,
  getAllSessions,
  getAllReviews,
  deleteReview,
};