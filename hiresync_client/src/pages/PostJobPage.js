import React, { useState } from 'react';
import axios from 'axios';
import './PostJobPage.css';

const PostJobPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'recruiter') {
      setError('Recruiter not logged in!');
      return;
    }

    const recruiterId = user._id;

    try {
      await axios.post('http://localhost:5000/api/jobs', {
        title,
        description,
        location,
        recruiterId,
      });

      alert('Job posted successfully!');
      setTitle('');
      setDescription('');
      setLocation('');
      setError('');
    } catch (err) {
      console.error('Error posting job:', err);
      setError('Error posting job. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <div className="background-side"></div>
      <div className="form-side">
        <div className="form-box">
          <h2>Post a New Job</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. UI/UX Designer"
              required
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job role and requirements"
              rows="4"
              required
            />

            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Remote, Mumbai"
              required
            />

            <button type="submit">Post Job</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
