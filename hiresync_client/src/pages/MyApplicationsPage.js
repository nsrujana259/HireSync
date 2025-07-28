import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user")); // seeker

  useEffect(() => {
    if (user?._id) {
      fetchApplications();
    }
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        `https://hiresync-backend.onrender.com/api/applications/seeker/${user._id}`
      );

      // Optional: filter out applications with missing jobId
      const cleanedApps = res.data.filter((app) => {
        if (!app.jobId) {
          console.warn("Missing jobId for application:", app);
          return false;
        }
        return true;
      });

      setApplications(cleanedApps);
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (applicationId) => {
    try {
      await axios.delete(`https://hiresync-backend.onrender.com/api/applications/${applicationId}`);
      // Remove from state
      setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      alert("Application deleted successfully.");
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📄 My Applications</h2>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p style={styles.message}>You have not applied to any jobs yet.</p>
      ) : (
        applications.map(({ _id, jobId, createdAt }) => (
          <div key={_id} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.jobTitle}>{jobId?.title || "Untitled Job"}</h3>
              <button style={styles.deleteBtn} onClick={() => handleDelete(_id)}>
                Delete
              </button>
            </div>
            <p><strong>Company:</strong> {jobId?.companyName || "Unknown Company"}</p>
            <p><strong>Location:</strong> {jobId?.location || "Not specified"}</p>
            <p><strong>Salary:</strong> ₹{jobId?.salary ?? "Not disclosed"}</p>
            <p><strong>Applied On:</strong> {new Date(createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    marginBottom: "25px",
    fontSize: "28px",
    color: "#2c3e50",
  },
  message: {
    fontSize: "18px",
    color: "#888",
  },
  card: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#34495e",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default MyApplicationsPage;
