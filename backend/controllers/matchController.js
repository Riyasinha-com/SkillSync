const Match = require("../models/Match");
const Skill = require("../models/Skill");

// ==========================
// Send Match Request
// ==========================
const sendMatchRequest = async (req, res) => {
  try {
    const { senderSkillId, receiverSkillId, message } = req.body;

    const senderSkill = await Skill.findById(senderSkillId);
const receiverSkill = await Skill.findById(receiverSkillId);

if (!senderSkill || !receiverSkill) {
  return res.status(404).json({
    message: "Skill not found",
  });
}
   
    // Sender must offer a Teach skill
if (senderSkill.type !== "Teach") {
  return res.status(400).json({
    message: "You can only offer a skill you teach",
  });
}

// Receiver must be looking to learn that skill
if (receiverSkill.type !== "Learn") {
  return res.status(400).json({
    message: "The selected user is not looking to learn this skill",
  });
}
    if (senderSkill.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only offer your own skills",
      });
    }

    if (receiverSkill.owner.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot match with yourself",
      });
    }

    const existingMatch = await Match.findOne({
      sender: req.user.id,
      receiver: receiverSkill.owner,
      senderSkill: senderSkillId,
      receiverSkill: receiverSkillId,
      status: "Pending",
    });

    if (existingMatch) {
      return res.status(400).json({
        message: "Match request already sent",
      });
    }

    const match = await Match.create({
      sender: req.user.id,
      receiver: receiverSkill.owner,
      senderSkill: senderSkillId,
      receiverSkill: receiverSkillId,
      message,
    });

    res.status(201).json({
      message: "Match request sent successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get My Sent Requests
// ==========================
const getSentRequests = async (req, res) => {
  try {
    const matches = await Match.find({
      sender: req.user.id,
    })
      .populate("receiver", "name profilePic city")
      .populate("senderSkill", "title category level")
      .populate("receiverSkill", "title category level")
      .sort({ createdAt: -1 });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get My Received Requests
// ==========================
const getReceivedRequests = async (req, res) => {
  try {
    const matches = await Match.find({
      receiver: req.user.id,
    })
      .populate("sender", "name profilePic city")
      .populate("senderSkill", "title category level")
      .populate("receiverSkill", "title category level")
      .sort({ createdAt: -1 });

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Mutual Match Suggestions
// ==========================
const getMatchSuggestions = async (req, res) => {
  try {
    // My Teach Skills
    const myTeachSkills = await Skill.find({
      owner: req.user.id,
      type: "Teach",
      isAvailable: true,
    });

    // My Learn Skills
    const myLearnSkills = await Skill.find({
      owner: req.user.id,
      type: "Learn",
      isAvailable: true,
    });

    const suggestions = [];

    for (const teachSkill of myTeachSkills) {
      for (const learnSkill of myLearnSkills) {
        const otherTeach = await Skill.findOne({
          owner: { $ne: req.user.id },
          type: "Teach",
          title: learnSkill.title,
          isAvailable: true,
        }).populate("owner", "name profilePic city");

        const otherLearn = await Skill.findOne({
          owner: otherTeach?.owner?._id,
          type: "Learn",
          title: teachSkill.title,
          isAvailable: true,
        });

        if (otherTeach && otherLearn) {
          suggestions.push({
            user: otherTeach.owner,
            theyTeach: otherTeach,
            theyWant: otherLearn,
            youTeach: teachSkill,
            youWant: learnSkill,
          });
        }
      }
    }

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Accept Match Request
// ==========================
const acceptMatchRequest = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    if (match.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept this request",
      });
    }

    if (match.status !== "Pending") {
      return res.status(400).json({
        message: `This match is already ${match.status}`,
      });
    }

    match.status = "Accepted";

    await match.save();

    res.status(200).json({
      message: "Match accepted successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Reject Match Request
// ==========================
const rejectMatchRequest = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }

    if (match.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to reject this request",
      });
    }

    if (match.status !== "Pending") {
      return res.status(400).json({
        message: `This match is already ${match.status}`,
      });
    }

    match.status = "Rejected";

    await match.save();

    res.status(200).json({
      message: "Match rejected successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMatchRequest,
  getSentRequests,
  getReceivedRequests,
  getMatchSuggestions,
  acceptMatchRequest,
  rejectMatchRequest,
};