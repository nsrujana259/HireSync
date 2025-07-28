// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AvailableJobsPage from './pages/AvailableJobsPage';
import PostJobPage from './pages/PostJobPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import BrowseJobs from './pages/BrowseJobs';
import UploadResume from './pages/UploadResume';
import ViewApplicantsPage from './pages/ViewApplicantsPage';
import EditJobPage from './pages/EditJobPage';
// Import your Navbar here

function App() {
  return (
    <Router>
      {/* Navbar goes here, outside Routes */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/jobs" element={<AvailableJobsPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/edit-job/:jobId" element={<EditJobPage />} />
        <Route path="/view-applicants/:jobId" element={<ViewApplicantsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
