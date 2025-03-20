import mongoose from "mongoose";

const createAssignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    selectedClass: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    subject: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    gradingCriteria: {
      type: String,
      default: "",
    },
    expectedAnswerFormat: {
      type: String,
      enum: ["text", "file", "code"],
      default: "text",
    },
    sampleAnswer: {
      type: String,
      default: "",
    },
    keywords: {
      type: [String], // Store keywords as an array
      default: [],
    },
    plagiarismCheck: {
      type: Boolean,
      default: false,
    },
    assignmentFile: {
      type: String, // Store file URL if uploaded
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const CreateAssignment = mongoose.model("CreateAssignment", createAssignmentSchema);
export default CreateAssignment;