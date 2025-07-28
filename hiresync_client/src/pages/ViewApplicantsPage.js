import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    axios
      .get(`https://hiresync-3492.onrender.com/api/applications/job/${jobId}`)
      .then((res) => setApplicants(res.data))
      .catch((err) => {
        console.error("Error fetching applicants:", err);
        alert("Failed to fetch applicants.");
      });
  }, [jobId]);

  return (
    <div className="container">
      <h2>Applicants for Job</h2>
      {applicants.length === 0 ? (
        <p>No applicants have applied yet.</p>
      ) : (
        <ul>
          {applicants.map((app) => (
            <li key={app._id}>
              <p><strong>Name:</strong> {app.seekerId?.name || "N/A"}</p>
              <p><strong>Email:</strong> {app.seekerId?.email || "N/A"}</p>
              <p><strong>Applied on:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewApplicantsPage;
