import express from 'express';
import { upload } from "../lib/upload.js";
import { protectedRoute, teacherRoute } from '../middlewares/auth.middleware.js';
import { createAssignment, createTest, getParticularStudentAssignmentDetails, getSubmissionofParticularAssignment, getSubmittedAssignments, getTeachersStudentansAssignment, updateSubmission, deleteTest, getSubmissionofParticularTest } from '../controllers/teacherDashboard.controller.js';

const router = express.Router();

router.get('/',protectedRoute,teacherRoute,getTeachersStudentansAssignment);
router.get('/studentsassignment',protectedRoute,teacherRoute,getParticularStudentAssignmentDetails);
router.get('/particularassignment',protectedRoute,teacherRoute,getSubmissionofParticularAssignment);
router.get('/particulartest',protectedRoute,teacherRoute,getSubmissionofParticularTest);
router.get('/studentsassignment/:id',protectedRoute,teacherRoute,getSubmittedAssignments);
router.put("/updateSubmission", protectedRoute, teacherRoute, updateSubmission);

router.post('/create-assignment',protectedRoute,teacherRoute , upload.single("assignmentFile"), createAssignment);
router.post('/create-test',protectedRoute,teacherRoute , createTest);
router.delete('/delete-test/:id',protectedRoute,teacherRoute, deleteTest);

export default router;