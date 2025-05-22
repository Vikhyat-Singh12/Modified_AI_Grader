import express from "express";
import { allAssignmentsandSubmittedAssignments, allTestsandSubmittedTests, getAssignedTeacher, submitAssignment, submitTest } from "../controllers/studentDashboard.controller.js";
import { protectedRoute, studentRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../lib/upload.js";

const router = express.Router();

router.get('/assignments',protectedRoute,studentRoute,allAssignmentsandSubmittedAssignments);
router.get('/tests',protectedRoute,studentRoute,allTestsandSubmittedTests);
router.get("/assignedTeacher", protectedRoute, studentRoute,getAssignedTeacher);
router.post("/submit-assignment", protectedRoute, studentRoute, upload.single("fileUrl"), submitAssignment);
router.post("/submit-test", protectedRoute, studentRoute, submitTest);

export default router;
