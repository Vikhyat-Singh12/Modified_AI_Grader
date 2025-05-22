import imagekit from "../lib/imagekit.js";
import CreateAssignment from "../models/createassignment.model.js";
import User from "../models/user.model.js";
import Submission from "../models/submission.model.js";
import CreateTest from "../models/createtest.model.js";
import SubmitTest from "../models/submittest.model.js";

export const createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      selectedClass,
      deadline,
      totalMarks,
      expectedAnswerFormat,
      gradingCriteria,
      keywords,
      sampleAnswer,
      plagiarismCheck,
    } = req.body;

    const subject = req.user.specializedSubject;
    const teacherId = req.user._id;

    const teacher = await User.findOne({ _id: teacherId, role: "teacher" });
    if (!teacher) {
      return res
        .status(403)
        .json({ message: "Only teachers can create assignments." });
    }

    // ✅ Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No assignment file uploaded" });
    }

    // ✅ Upload the PDF file to ImageKit
    const result = await imagekit.upload({
      file: req.file.buffer, // File buffer
      fileName: `${teacherId}-${Date.now()}_${req.file.originalname}`, // ✅ Ensures unique filenames
      folder: "assignments", // ✅ No leading slash
      useUniqueFileName: true,
    });

    // ✅ Save the assignment details in MongoDB
    const newAssignment = new CreateAssignment({
      title,
      description,
      selectedClass,
      subject,
      teacherId,
      deadline,
      totalMarks,
      expectedAnswerFormat,
      gradingCriteria,
      keywords,
      sampleAnswer,
      plagiarismCheck,
      assignmentFile: result.url, // ✅ Public URL of the uploaded file
    });

    await newAssignment.save();

    res.status(201).json({
      message: "Assignment created successfully!",
      newAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(500).json({ message: "Error creating assignment", error });
  }
};

export const createTest = async (req, res) => {
  try {
    const { title, selectedClass, deadline, totalMarks,testDuration, questions } = req.body;
    const subject = req.user.specializedSubject;
    const teacherId = req.user._id;

    const teacher = await User.findOne({ _id: teacherId, role: "teacher" });
    if (!teacher) {
      return res
        .status(403)
        .json({ message: "Only teachers can create tests." });
    }

    const newTest = new CreateTest({
      title,
      selectedClass,
      subject,
      teacherId,
      deadline,
      totalMarks,
      testDuration,
      questions,
    });

    await newTest.save();

    res.status(201).json({ message: "Test created successfully!", newTest });
  } catch (error) {
    console.log("Error in createtest controller:", error);
    res.status(500).json({ message: "Error creating test", error });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTest = await CreateTest.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully", deletedTest });
  } catch (error) {
    console.error("Error in deleteTest controller:", error);
    res.status(500).json({ message: "Error deleting test", error });
  }
};

export const getTeachersStudentansAssignment = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const specializedSubject = req.user.specializedSubject;
    const selectedClass = Number(req.query.selectedClass);

    if (!selectedClass) {
      return res.status(400).json({ message: "Class selection is required" });
    }

    if (!specializedSubject) {
      return res
        .status(400)
        .json({ message: "Teacher's specialized subject is missing" });
    }

    const students = await User.find({
      isApproved: true,
      role: "student",
      studentClass: selectedClass,
      subjects: { $in: [specializedSubject] },
    });

    const assignments = await CreateAssignment.find({
      teacherId,
      selectedClass,
      subject: specializedSubject,
    });

    const tests = await CreateTest.find({
      teacherId,
      selectedClass,
      subject: specializedSubject,
    });

    res
      .status(200)
      .json({
        message: "Teacher's students fetched and also assignments successfully",
        students,
        assignments,
        tests,
      });
  } catch (error) {
    console.error("Error in getTeachersStudent controller:", error);
    res
      .status(500)
      .json({ message: "Error fetching teacher's students", error });
  }
};

export const getSubmissionofParticularAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.query;
    const submitassignment = await Submission.find({ assignmentId });
    res
      .status(200)
      .json({
        message: "Submitted assignment fetched successfully",
        submitassignment,
      });
  } catch (error) {
    console.error(
      "Error in getSubmissionofParticularAssignment controller:",
      error
    );
    res
      .status(500)
      .json({ message: "Error fetching submitted assignment", error });
  }
};

export const getSubmissionofParticularTest = async (req, res) => {
  try {
    const { testId } = req.query;
    const submitTest = await SubmitTest.find({ testId });
    res.status(200).json({
      message: "Submitted test fetched successfully",
      submitTest,
    });
  } catch (error) {
    console.error("Error in getSubmissionofParticularTest controller:", error);
    res.status(500).json({ message: "Error fetching submitted test", error });
  }
};


export const getParticularStudentAssignmentDetails = async (req, res) => {
  try {
    const { studentId, studentClass } = req.query;

    if (!studentId || !studentClass) {
      return res
        .status(400)
        .json({ message: "Student ID and class are required." });
    }

    if (isNaN(studentClass)) {
      return res
        .status(400)
        .json({ message: "Invalid class value. Must be a number." });
    }

    const subject = req.user.specializedSubject;

    const submitassignment = await Submission.find({
      studentId,
      subject,
      studentClass,
    });

    const student = await User.findById(studentId).select("-password");

    res
      .status(200)
      .json({
        message: "Particular student's assignment details fetched successfully",
        submitassignment,
        student,
      });
  } catch (error) {
    console.error(
      "Error in getParticularStudentAssignmentDetails controller:",
      error
    );
    res
      .status(500)
      .json({ message: "Error fetching particular student details", error });
  }
};

export const getSubmittedAssignments = async (req, res) => {
  try {
    const { id } = req.body;
    const viewSubmittedAssignments = await Submission.findById(id);
    res
      .status(200)
      .json({
        message: "Submitted assignments fetched successfully",
        viewSubmittedAssignments,
      });
  } catch (error) {
    console.error("Error in getSubmittedAssignments controller:", error);
    res
      .status(500)
      .json({ message: "Error fetching submitted assignments", error });
  }
};

export const getSubmittedTest = async (req,res) => {
  try {
    const {id} = req.body;
    const viewSubmittedTest = await Submission.findById(id);
    res.status(200).json({
      message: "Submitted test fetched successfully",
      viewSubmittedTest,
    });
    
  } catch (error) {
    console.error("Error in getSubmittedTest controller:", error);
    res.status(500).json({ message: "Error fetching submitted test", error });
  }
}

export const updateSubmission = async (req, res) => {
  try {
    const { aiMarks, aiShortFeedback, editSubmittedAssignmentId } = req.query;

    if (!editSubmittedAssignmentId) {
      return res.status(400).json({ message: "Please provide assignment id" });
    }

    if (!aiMarks && !aiShortFeedback) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updateSubmission = await Submission.findByIdAndUpdate(
      editSubmittedAssignmentId,
      { aiMarks, aiShortFeedback },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Submission updated successfully", updateSubmission });
  } catch (error) {
    console.error("Error in updateSubmission controller:", error);
    res.status(500).json({ message: "Error updating submission", error });
  }
};
