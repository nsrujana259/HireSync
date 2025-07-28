require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoute");

const app = express();

// ✅ Manual CORS headers middleware (to fix Render CORS issues)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://hiresync-frontend.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// ✅ JSON body parser
app.use(express.json());

// ✅ Serve static uploaded files (for resumes, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Route registration
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
