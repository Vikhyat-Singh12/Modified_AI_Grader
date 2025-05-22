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
      type: String,
      default: "", 
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

    studentClass: {
      type: Number, 
      min: 1,
      max: 12,
      default: null, 
    },
    subjects: {
      type: [String], 
      default: [], 
    },

    assignedClasses: {
      type: [Number],
      default: [], 
    },
    specializedSubject: {
      type: String,
      default: undefined,
    },
    experience: {
      type: Number, 
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: false, 
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
