import express from 'express';
import multer from 'multer';
import { login, signup, logout, updateProfile, getMe } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });


router.post("/signup", upload.single("profilePicture"), signup);
router.post('/login',login);
router.post('/logout',logout);

router.put("/update-profile", protectedRoute, updateProfile);

router.get("/me", protectedRoute, getMe);

export default router;