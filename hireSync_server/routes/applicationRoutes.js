const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.post("/apply", async (req, res) => {
  const { jobId, seekerId, resumeUrl } = req.body;
router.delete("/:id", async (req, res) => {
  try {
    const result = await Application.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

  const existing = await Application.findOne({ jobId, seekerId });
  if (existing) return res.status(400).json({ message: "Already applied" });

  const app = new Application({ jobId, seekerId, resumeUrl });
  await app.save();
  res.status(201).json({ message: "Application submitted" });
});

router.get("/seeker/:id", async (req, res) => {
  const apps = await Application.find({ seekerId: req.params.id }).populate("jobId");
  res.json(apps);
});

router.get("/job/:jobId", async (req, res) => {
  const apps = await Application.find({ jobId: req.params.jobId }).populate("seekerId");
  res.json(apps);
});
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).populate("seekerId");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications." });
  }
});
module.exports = router;
