import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JobSeekerDashboard.css";

const JobSeekerDashboard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Srujana",
        email: "nsrujana@gmail.com",
      };
      setUser(storedUser);
      setResume(null); // Change this to simulate resume presence
      setApplications([]); // Simulate applications
      setLoading(false);
    }, 1000);
  }, []);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Resume "${file.name}" uploaded successfully.`);
      setResume(file); // Simulate storing
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Job Seeker Dashboard</h1>

      {loading ? (
        <p className="loading">Loading your profile...</p>
      ) : (
        <div className="grid-container">
          {/* Profile Card */}
          <div className="card">
            <h2 className="card-title">Profile</h2>
            <div className="info-row"><strong>Name:</strong> {user.name}</div>
            <div className="info-row"><strong>Email:</strong> {user.email}</div>
            <div className="info-row">
              <strong>Resume:</strong>{" "}
              {resume ? (
                <span className="status uploaded">Uploaded</span>
              ) : (
                <span className="status not-uploaded">Not Uploaded</span>
              )}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="card">
            <h2 className="card-title">Resume Upload</h2>
            {resume ? (
              <p className="info-row">Resume uploaded successfully.</p>
            ) : (
              <p className="info-row">You haven’t uploaded a resume yet.</p>
            )}
            <button
              className="btn primary"
              onClick={() => document.getElementById("resumeInput").click()}
            >
              {resume ? "Replace Resume" : "Upload Resume"}
            </button>
            <input
              type="file"
              id="resumeInput"
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </div>

          {/* Applications */}
          <div className="card">
            <h2 className="card-title">Applications</h2>
            <p className="info-row"><strong>Total Applied:</strong> {applications.length}</p>
            {applications.length === 0 ? (
              <p>No job applications yet.</p>
            ) : (
              <button className="btn secondary" onClick={() => navigate("/my-applications")}>
                View Applications
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      {!loading && (
        <div className="nav-buttons">
          <button className="btn secondary" onClick={() => navigate("/jobs")}>
            🔍 Browse Jobs
          </button>
          <button
            className="btn secondary"
            onClick={() => document.getElementById("resumeInput").click()}
          >
            Upload Resume
          </button>
          <button className="btn secondary" onClick={() => navigate("/my-applications")}>
            My Applications
          </button>
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
