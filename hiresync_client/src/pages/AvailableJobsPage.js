import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AvailableJobsPage.css";

function AvailableJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
    if (user?._id) {
      fetchAppliedJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://hiresync-backend.onrender.com/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `http://hiresync-backend.onrender.com/api/applications/seeker/${user._id}`
      );
      const appliedIds = res.data.map((app) => app.jobId._id);
      setAppliedJobIds(appliedIds);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await axios.post("https://hiresync-backend.onrender.com/api/applications/apply", {
        jobId,
        seekerId: user._id,
        resumeUrl: "",
      });
      alert("Application submitted successfully!");
      setAppliedJobIds([...appliedJobIds, jobId]);
    } catch (err) {
      console.error("Error applying to job:", err);
      alert("Failed to apply.");
    }
  };

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> ₹{job.salary}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>

            {appliedJobIds.includes(job._id) ? (
              <button disabled>Already Applied</button>
            ) : (
              <button onClick={() => handleApply(job._id)}>Apply</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AvailableJobsPage;
