const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Application = require("../models/Application");

// POST /jobs - Create a new job
router.post("/", async (req, res) => {
  try {
    const { title, description, location, salary, recruiter } = req.body;

    if (!recruiter) {
      return res.status(400).json({ message: "Recruiter ID is required" });
    }

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      recruiter
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /jobs - All jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// GET /jobs/recruiter/:recruiterId - Jobs by recruiter
router.get("/recruiter/:recruiterId", async (req, res) => {
  try {
    const recruiterId = req.params.recruiterId;
    const jobs = await Job.find({ recruiter: recruiterId });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching recruiter jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// DELETE /jobs/:id - Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
