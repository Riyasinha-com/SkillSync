const Session = require("../models/Session");
const Match = require("../models/Match");

// ==========================
// Create Session
// ==========================
const createSession = async (req, res) => {
  try {
    const {
      matchId,
      scheduledDate,
      startTime,
      endTime,
      meetingLink,
    } = req.body;

    // Find the match
    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    // Match must be accepted
    if (match.status !== "Accepted") {
      return res.status(400).json({
        message: "Only accepted matches can schedule sessions",
      });
    }

    // Only sender or receiver can create the session
    if (
      match.sender.toString() !== req.user.id &&
      match.receiver.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    const session = await Session.create({
      match: match._id,
      teacher: match.sender,
      learner: match.receiver,
      scheduledDate,
      startTime,
      endTime,
      meetingLink,
    });

    res.status(201).json({
      message: "Session created successfully",
      session,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get My Sessions
// ==========================
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [
        { teacher: req.user.id },
        { learner: req.user.id },
      ],
    })
      .populate("teacher", "name profilePic")
      .populate("learner", "name profilePic")
      .populate({
        path: "match",
        populate: [
          { path: "senderSkill", select: "title" },
          { path: "receiverSkill", select: "title" },
        ],
      })
      .sort({ scheduledDate: 1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Session
// ==========================
const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Only teacher or learner can update
    if (
      session.teacher.toString() !== req.user.id &&
      session.learner.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.status(200).json({
      message: "Session updated successfully",
      session: updatedSession,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Complete Session
// ==========================
const completeSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Only teacher or learner can complete
    if (
      session.teacher.toString() !== req.user.id &&
      session.learner.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    if (session.status !== "Scheduled") {
      return res.status(400).json({
        message: `Session is already ${session.status}`,
      });
    }

    session.status = "Completed";

await session.save();

    res.status(200).json({
      message: "Session completed successfully",
      session,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createSession,
  getMySessions,
  updateSession,
  completeSession,
};
