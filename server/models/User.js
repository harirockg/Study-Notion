const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    accountType: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      required: true,
    },

    contactNumber: {
      type: String,
    },

    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    image: {
      type: String,
      default:
        "https://api.dicebear.com/5.x/initials/svg?seed=User",
    },

    token: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
