// backend/routes/application.js
const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// ✅ GET all applications for a specific seeker
router.get("/seeker/:seekerId", async (req, res) => {
  try {
    const applications = await Application.find({ seekerId: req.params.seekerId })
      .populate("jobId")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching seeker applications:", err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// ✅ Apply to a job
router.post("/apply", async (req, res) => {
  const { jobId, seekerId } = req.body;
  try {
    const existing = await Application.findOne({ jobId, seekerId });
    if (existing) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const newApplication = new Application({ jobId, seekerId });
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ message: "Failed to apply" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully." });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// ✅ GET applicants for a job
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate("seekerId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    console.error("Error fetching job applicants:", err);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
});

module.exports = router;
