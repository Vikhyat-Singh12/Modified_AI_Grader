import User from "../models/user.model.js";

export const allPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false });

    // Return the response
    res.status(200).json({ success: true, users: pendingUsers });
  } catch (error) {
    console.log("Error in allPendingUsers controller", error);
    res.status(500).json({ message: "Error in allPendingUsers controller" });
  }
};

export const allTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ isApproved: true, role: "teacher" });

    // Return the response
    res.status(200).json({ success: true, users: teachers });
  } catch (error) {
    console.log("Error in allTeachers controller", error);
    res.status(500).json({ message: "Error in allTeachers controller" });
  }
};

export const allStudents = async (req, res) => {
  try {
    const students = await User.find({ isApproved: true, role: "student" });

    // Return the response
    res.status(200).json({ success: true, users: students });
  } catch (error) {
    console.log("Error in allStudents controller", error);
    res.status(500).json({ message: "Error in allStudents controller" });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { userId, assignedClasses } = req.body;

    // Find the user first
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role === "teacher") {
      if (!assignedClasses || assignedClasses.length === 0) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please select at least one class before approving the teacher.",
          });
      }
    }
    // If the user is a teacher, update assignedClasses
    const updateFields = { isApproved: true };
    if (user.role === "teacher" && Array.isArray(assignedClasses)) {
      updateFields.assignedClasses = assignedClasses;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error in verifyUser controller", error);
    res.status(500).json({ message: "Error in verifyUser controller" });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateUser = await User.findByIdAndDelete(userId);

    // Return the response
    res.status(200).json({ success: true, user: updateUser });
  } catch (error) {
    console.log("Error in rejectUser controller", error);
    res.status(500).json({ message: "Error in rejectUser controller" });
  }
};
