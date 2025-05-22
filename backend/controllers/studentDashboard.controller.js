import CreateAssignment from "../models/createassignment.model.js";
import Submission from "../models/submission.model.js";
import CreateTest from "../models/createtest.model.js";
import SubmitTest from "../models/submittest.model.js";
import { extractTextFromPDFUrl } from "../lib/extractTextFromPDF.js";
// import generateAIGrading from "../lib/aigrader.js";
import generateAIGrading from "../lib/text_evaluator.js";
import imagekit from "../lib/imagekit.js";
import User from "../models/user.model.js";

export const submitAssignment = async (req, res) => {
  try {
    const { assignmentId, subject } = req.body;
    const studentId = req.user._id;
    const studentClass = req.user.studentClass;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file to ImageKit
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer, // File buffer
      fileName: `${studentId}-${Date.now()}-${req.file.originalname}`, // ✅ Ensures unique filenames
      folder: "assignments", // ✅ No leading slash
    });

    // Get the secure URL of the uploaded PDF
    const publicURL = uploadResponse.url;

    // Extract text from the uploaded student file
    let studentText = await extractTextFromPDFUrl(publicURL);

    const assignment = await CreateAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Extract text from the assignment file
    let assignmentText = await extractTextFromPDFUrl(assignment.assignmentFile);

    // Generate AI grading
    const { aiShortFeedback, aiLongFeedback, aiMarks } =
      await generateAIGrading(studentText, assignmentText, assignment);

    // Create submission record
    const submission = new Submission({
      assignmentId,
      studentId,
      studentClass,
      subject,
      fileUrl: publicURL, // Storing the ImageKit URL
      submissionDateTime: new Date(),
      aiShortFeedback,
      aiLongFeedback,
      aiMarks,
      status: true,
    });

    await submission.save();
    res.json({
      message: "Assignment submitted & graded successfully!",
      submission,
    });
  } catch (error) {
    console.error("Error in submitAssignment:", error);
    res.status(500).json({ message: "Error submitting assignment", error });
  }
};

export const submitTest = async (req, res) => {
  try {
    const { testId, answers, marks, subject } = req.body;
    const studentId = req.user._id;
    const studentClass = req.user.studentClass;

    const submitTest = new SubmitTest({
      testId,
      studentId,
      studentClass,
      subject,
      answers,
      marks,
      status: true,
      submissionDateTime: new Date(),
    });

    await submitTest.save();
    res.json({
      message: "Test submitted successfully!",
      submitTest,
    });
  } catch (error) {
    console.error("Error in submitTest:", error);
    res.status(500).json({ message: "Error submitting test", error });
  }
};

export const allAssignmentsandSubmittedAssignments = async (req, res) => {
  try {
    const selectedClass = req.user.studentClass;
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Please provide subject" });
    }

    const assignments = await CreateAssignment.find({
      selectedClass,
      subject,
    });

    const submittedAssignments = await Submission.find({
      studentId: req.user._id,
      subject,
    });

    res
      .status(200)
      .json({
        message: "All assignments fetched successfully",
        assignments,
        submittedAssignments,
      });
  } catch (error) {
    console.error("Error in allAssignments controller:", error);
    res.status(500).json({ message: "Error fetching assignments", error });
  }
};



export const allTestsandSubmittedTests = async (req, res) => {
  try {
    const selectedClass = req.user.studentClass;
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Please provide subject" });
    }

    const tests = await CreateTest.find({
      selectedClass,
      subject,
    });

    const submittedTests = await SubmitTest.find({
      studentId: req.user._id,
      subject,
    });

    res
      .status(200)
      .json({
        message: "All tests fetched successfully",
        tests,
        submittedTests,
      });
  } catch (error) {
    console.error("Error in allTests controller:", error);
    res.status(500).json({ message: "Error fetching tests", error });
  }
};

export const getAssignedTeacher = async (req, res) => {
  try {
    const selectedClass = req.user.studentClass;
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Please provide subject" });
    }

    const assignedTeacher = await User.findOne({
      role: "teacher",
      specializedSubject: subject,
      assignedClasses: { $in: [selectedClass] },
    }).select("name profilePicture _id");

    if (!assignedTeacher) {
      return res
        .status(404)
        .json({ message: "No teacher assigned for this subject" });
    }

    res
      .status(200)
      .json({
        message: "Assigned teacher fetched successfully",
        assignedTeacher,
      });
  } catch (error) {
    console.error("Error in getAssignedTeacher controller:", error);
    res.status(500).json({ message: "Error fetching assigned teacher", error });
  }
};
