import React, { useState } from 'react';
import axios from 'axios';

const UploadResume = () => {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!resume) return;

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('userId', 'USER_ID_HERE'); // Replace this with actual user ID from login

    try {
      await axios.post('https://hiresync-3492.onrender.com/api/upload/resume', formData);
      alert('Resume uploaded successfully!');
    } catch (err) {
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Resume</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="form-control"
          required
        />
        <button type="submit" className="btn btn-success mt-3">Upload Resume</button>
      </form>
    </div>
  );
};

export default UploadResume;
