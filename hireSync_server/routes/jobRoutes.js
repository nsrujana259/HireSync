const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST /api/jobs - Create a new job
router.post("/", async (req, res) => {
  try {
    const { title, description, location, salary, recruiterId } = req.body;

    if (!recruiterId) {
      return res.status(400).json({ message: "Recruiter ID is required" });
    }

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      recruiter: recruiterId,
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error("Error posting job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/jobs - Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// GET /api/jobs/recruiter/:recruiterId - Get jobs by recruiter
router.get("/recruiter/:recruiterId", async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.params.recruiterId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recruiter jobs" });
  }
});

// DELETE /api/jobs/:id - Delete a job
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/jobs/:id - Update a job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
