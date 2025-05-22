import express from 'express';
import { chatbot, optiongenerator, question_option } from "../controllers/chatbot.controller.js";

const router = express.Router();

router.get('/', chatbot);
router.get("/optiongenerator", optiongenerator);
router.get("/question_option", question_option);

export default router;