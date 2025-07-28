import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RecruiterDashboard.css";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const recruiter = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          `https://hiresync-3492.onrender.com/api/jobs/recruiter/${recruiter._id}`
        );
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    if (recruiter?._id) fetchJobs();
  }, [recruiter]);

  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(
        `https://hiresync-3492.onrender.com/api/applications/job/${jobId}`
      );
      setSelectedJob({ ...selectedJob, _id: jobId, applicants: res.data });
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    fetchApplicants(job._id);
  };

  return (
    <div className="recruiter-container">
      {/* Sidebar with Post Job */}
      <div className="sidebar">
        <h2 className="sidebar-title">Recruiter Panel</h2>
        <Link to="/post-job">
          <button className="post-button">Post Job</button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2 className="heading">Recruiter Dashboard</h2>

        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>

              <div className="button-group">
                <Link to={`/edit-job/${job._id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button
                  className="view-button"
                  onClick={() => handleViewApplicants(job)}
                >
                  View Applicants
                </button>
              </div>

              {selectedJob?.applicants && selectedJob._id === job._id && (
                <div>
                  <h5>Applicants:</h5>
                  {selectedJob.applicants.length === 0 ? (
                    <p>No applicants yet.</p>
                  ) : (
                    <ul>
                      {selectedJob.applicants.map((app) => (
                        <li key={app._id}>
                          <strong>Name:</strong> {app.seekerId?.name || "N/A"} |{" "}
                          <strong>Email:</strong> {app.seekerId?.email || "N/A"}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
