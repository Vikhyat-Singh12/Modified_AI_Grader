import express from 'express';
import { adminRoute, protectedRoute } from '../middlewares/auth.middleware.js';
import { allPendingUsers, allStudents, allTeachers ,verifyUser,rejectUser} from '../controllers/adminDashboard.controller.js';

const router = express.Router();    

router.get('/',protectedRoute,adminRoute,allPendingUsers);
router.get('/teachers',protectedRoute,adminRoute,allTeachers);
router.get("/students", protectedRoute, adminRoute, allStudents);
router.put("/verify", protectedRoute, adminRoute, verifyUser);
router.delete("/delete/:userId", protectedRoute, adminRoute, rejectUser);


export default router;