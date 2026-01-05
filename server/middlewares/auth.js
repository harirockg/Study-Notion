// Import required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// ======================= AUTH MIDDLEWARE =======================
exports.auth = async (req, res, next) => {
  try {
    // Safely extract token
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (req.header("Authorization")
        ? req.header("Authorization").replace("Bearer ", "")
        : null);

    // If token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};

// ======================= STUDENT MIDDLEWARE =======================
exports.isStudent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!userDetails || userDetails.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Students",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role Can't be Verified",
    });
  }
};

// ======================= ADMIN MIDDLEWARE =======================
exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!userDetails || userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role Can't be Verified",
    });
  }
};

// ======================= INSTRUCTOR MIDDLEWARE =======================
exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (!userDetails || userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Instructor",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role Can't be Verified",
    });
  }
};
