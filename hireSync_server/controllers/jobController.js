// controllers/jobController.js
const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const newJob = new Job({ ...req.body, postedBy: req.user.id });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    job.applicants.push(req.user.id);
    await job.save();
    res.json({ msg: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
