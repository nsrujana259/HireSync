import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  useEffect(() => {
    axios
      .get(`https://hiresync-3492.onrender.com/api/jobs/${jobId}`)
      .then((res) => {
        setJobData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
      });
  }, [jobId]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recruiter = JSON.parse(localStorage.getItem("user"));
      const updatedData = {
        ...jobData,
        recruiter: recruiter._id,
      };

      await axios.put(`https://hiresync-3492.onrender.com/api/jobs/${jobId}`, updatedData);

      alert("Job updated successfully!");
      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update job.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://hiresync-backend.onrender.com/api/jobs/${jobId}`);
      alert("Job deleted successfully!");
      navigate("/recruiter/dashboard");
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              name="title"
              value={jobData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Backend Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Update job responsibilities or details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              name="location"
              value={jobData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Remote, Mumbai"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              name="salary"
              value={jobData.salary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., ₹12 LPA"
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Update Job
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Delete Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;
