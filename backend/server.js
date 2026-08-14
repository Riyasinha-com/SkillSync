const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const matchRoutes = require("./routes/matchRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================
// Middleware
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Routes
// ==========================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Profile Routes
app.use("/api/profile", profileRoutes);

// Skill Routes
app.use("/api/skills", skillRoutes);

// Match Routes
app.use("/api/matches", matchRoutes);

// Session Routes
app.use("/api/sessions", sessionRoutes);

// Review Routes
app.use("/api/reviews", reviewRoutes);

// Conversation Routes
app.use("/api/conversations", conversationRoutes);

// Message Routes
app.use("/api/messages", messageRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Notification Routes
app.use("/api/notifications", notificationRoutes);

// ==========================
// Test Route
// ==========================
app.get("/", (req, res) => {
  res.send("🚀 SkillSync Backend is Running!");
});

// ==========================
// Start Server
// ==========================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});