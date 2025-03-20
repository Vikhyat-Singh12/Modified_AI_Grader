import express from "express";
import { allAssignmentsandSubmittedAssignments, getAssignedTeacher, submitAssignment } from "../controllers/studentDashboard.controller.js";
import { protectedRoute, studentRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../lib/upload.js";

const router = express.Router();

router.get('/',protectedRoute,studentRoute,allAssignmentsandSubmittedAssignments);
router.get("/assignedTeacher", protectedRoute, studentRoute,getAssignedTeacher);
router.post("/submit-assignment", protectedRoute, studentRoute, upload.single("fileUrl"), submitAssignment);


export default router;
