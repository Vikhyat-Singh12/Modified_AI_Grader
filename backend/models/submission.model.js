import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateAssignment",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentClass: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      default: "",
      required: true,
    },
    submissionDateTime: {
      type: Date,
      default: null,
    },
    aiLongFeedback: {
      type: String,
      default: "Pending AI Evaluation",
    },
    aiShortFeedback: {
      type: String,
      default: "Pending AI Evaluation",
    },
    aiMarks: {
      type: Number,
      min: 0,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
