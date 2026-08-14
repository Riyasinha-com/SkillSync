const Skill = require("../models/Skill");
const Match = require("../models/Match");
const Session = require("../models/Session");
const Conversation = require("../models/Conversation");

// ==========================
// Get Dashboard Summary
// ==========================
const getDashboard = async (req, res) => {
  try {
    // Total skills
    const skillsCount = await Skill.countDocuments({
      owner: req.user.id,
    });

    // Pending match requests received
    const pendingRequests = await Match.countDocuments({
      receiver: req.user.id,
      status: "Pending",
    });

    // Accepted matches
    const acceptedRequests = await Match.countDocuments({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id },
      ],
      status: "Accepted",
    });

    // Upcoming sessions
    const upcomingSessions = await Session.countDocuments({
      $or: [
        { teacher: req.user.id },
        { learner: req.user.id },
      ],
      status: "Scheduled",
    });

    // Completed sessions
    const completedSessions = await Session.countDocuments({
      $or: [
        { teacher: req.user.id },
        { learner: req.user.id },
      ],
      status: "Completed",
    });

    // Average rating
    const skills = await Skill.find({
      owner: req.user.id,
    });

    let averageRating = 0;

    if (skills.length > 0) {
      averageRating =
        skills.reduce(
          (sum, skill) => sum + skill.averageRating,
          0
        ) / skills.length;
    }

    // Active conversations
    const activeConversations = await Conversation.countDocuments({
      participants: req.user.id,
    });

    res.status(200).json({
      skillsCount,
      pendingRequests,
      acceptedRequests,
      upcomingSessions,
      completedSessions,
      averageRating,
      activeConversations,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};