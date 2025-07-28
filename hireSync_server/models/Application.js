const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Seeker" based on your user model
    required: true,
  },
  resumeUrl: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
