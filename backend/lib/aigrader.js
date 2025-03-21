import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

// Function to send data to Gemini API
const generateAIGrading = async (studentText, assignmentText, assignment) => {
  const prompt = `
      Assignment Questions: ${assignmentText}
      Assignment Title: ${assignment.title}
      Sample Answer: ${assignment.sampleAnswer}
      Grading Criteria: ${assignment.gradingCriteria}
      Keywords to Check: ${assignment.keywords.join(", ")}

      Student's Answer:
      ${studentText}

      Evaluate based on the above criteria and provide:
      1. Short Feedback (1-2 lines)
      2. Detailed Feedback
      3. Marks (out of ${assignment.totalMarks})

      Generate:
      1. AI Short Feedback (concise summary).
      2. AI Long Feedback (detailed analysis with improvements).
      3. AI Marks (out of total marks).
  `;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        prompt,
        max_tokens: 2000,
      }
    );

    const aiResponse = response.data.choices[0].text.trim().split("\n");

    return {
      aiShortFeedback: aiResponse[0],
      aiLongFeedback: aiResponse.slice(1, -1).join("\n"),
      aiMarks: parseInt(aiResponse[aiResponse.length - 1], 10) || 0,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      aiShortFeedback: "AI evaluation failed. ",
      aiLongFeedback:"AI evaluation failed. Feedback is manually entered through the admin panel.",
      aiMarks: 12,
    };
  }
};

export default generateAIGrading;





