import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const generateAIGrading = async (studentText, assignmentText, assignment) => {
  const prompt = `
    Assignment Title: ${assignment.title}
    Assignment Questions: ${assignmentText}
    Grading Criteria: ${assignment.gradingCriteria}
    Keywords to Check: ${assignment.keywords.join(", ")}
    
    Student's Answer:
    ${studentText}

    ### Instructions for AI:
    - Evaluate the student's answer based on the grading criteria.
    - Provide a score out of ${assignment.totalMarks}.
    - Give short and long feedback.

    ### Expected Response Format:
    - Marks: (Score out of ${assignment.totalMarks})
    - Short Feedback: (1-2 lines)
    - Long Feedback: (Detailed analysis)
  `;

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Extract response text
    const aiResponse = response.data.candidates[0].content.parts[0].text;
    const lines = aiResponse.split("\n");

    return {
      aiShortFeedback:
        lines[1]?.replace("Short Feedback:", "").trim() ||
        "No feedback provided.",
      aiLongFeedback:
        lines.slice(2).join("\n").replace("Long Feedback:", "").trim() ||
        "No detailed feedback provided.",
      aiMarks: parseInt(lines[0]?.replace("Marks:", "").trim(), 10) || 0,
    };
  } catch (error) {
    // **Debugging - Log Full Gemini API Error Response**
    console.error("Gemini API Error:", JSON.stringify(error?.response?.data, null, 2));
    
    return {
      aiShortFeedback: "AI evaluation failed.",
      aiLongFeedback:
        "AI evaluation failed. Feedback is manually entered through the admin panel.",
      aiMarks: 12,
    };
  }
};

export default generateAIGrading;


