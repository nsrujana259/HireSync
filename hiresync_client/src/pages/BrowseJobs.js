import React, { useEffect, useState } from "react";
import axios from "axios";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://hiresync-backend.onrender.com/api/jobs") // Update if your backend URL is different
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApply = async (jobId) => {
    try {
      const response = await axios.post("http://hiresync-backend.onrender.com/api/applications", {
        userId: user._id,
        jobId: jobId,
      });

      alert(" You have successfully applied to this job!");
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Failed to apply. You may have already applied.");
    }
  };

  return (
    <div className="browse-jobs-container">
      <h1>Browse Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h2>{job.title}</h2>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <button className="btn primary" onClick={() => handleApply(job._id)}>
              Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BrowseJobs;
