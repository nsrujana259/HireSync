// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  role: {
    type: String, 
    enum: ["jobseeker", "recruiter"], // 👈 Lowercase roles
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
