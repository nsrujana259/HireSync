// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <div className="home-overlay">
        <h1 className="mb-3">Welcome to HireSync</h1>
        <p className="mb-4">Your smart job portal.</p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-success">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
