import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    profilePicture: {
      type: String, // Should be a URL string, not a direct import
      default: "", // Replace with your default image URL
    },
    address: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: Date.now,
    },
    bio: {
      type: String,
      default: "",
    },

    // Student-Specific Fields
    studentClass: {
      type: Number, // For students (1-12)
      min: 1,
      max: 12,
      default: null, // Null for teachers & admins
    },
    subjects: {
      type: [String], // For students (list of enrolled subjects)
      default: [], // Undefined for teachers & admins
    },

    // Teacher-Specific Fields
    assignedClasses: {
      type: [Number], // For teachers (list of assigned classes)
      default: [], // Undefined for students & admins
    },
    specializedSubject: {
      type: String, // For teachers (single specialized subject)
      default: undefined,
    },
    experience: {
      type: Number, // For teachers (years of experience)
      default: 0,
    },

    // Admin Approval
    isApproved: {
      type: Boolean,
      default: false, // Admin approval status
    },

    dateOfRegistration: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
