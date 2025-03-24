import express from 'express';
import { chatbot } from '../controllers/chatbot.controller.js';

const router = express.Router();

router.get('/', chatbot);

export default router;