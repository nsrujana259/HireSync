// src/utils/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://hiresync-backend.onrender.com', // Change if your backend is on a different port or deployed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
