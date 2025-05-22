import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const chatbot = async (req, res) => {
  try {
    const { text, history } = req.query; 

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const chatContext = history
      ? `Previous messages:\n${history}\nUser: ${text}`
      : text;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ role: "user", parts: [{ text: chatContext }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data?.candidates) {
      return res.json({
        reply:
          response.data.candidates[0]?.content?.parts[0]?.text ||
          "No response generated",
      });
    } else {
      return res.status(500).json({
        message: "Error generating response",
      });
    }
  } catch (error) {
    console.error("Error in chatbot controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const optiongenerator = async (req, res) => {
  try {
    const { question } = req.query;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const chatContext = `
    Generate 4 answer options for the following multiple-choice question:
    "${question}"

    Instructions:
    - Only ONE of the four options should be correct.
    - The other three should be incorrect but reasonable.
    - Each option must be concise (one word or up to 10 words).
    - Return a JSON array of 5 elements:
      1. The first four elements are the shuffled answer options.
      2. The fifth element is the correct option (copied exactly from one of the four).
    - Format example:
    ["Option A", "Option B", "Option C", "Option D", "Correct Option"]
    Return only the JSON array, no explanations or extra text.
    `;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{ role: "user", parts: [{ text: chatContext }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let options = [];

    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        options = parsed;
      } else {
        throw new Error("Not a valid array");
      }
    } catch (err) {
      const cleaned = text
        .replace(/[\[\]"',]/g, "")
        .split(/\s+/)
        .map((opt) => opt.trim())
        .filter((opt) => opt.length > 0)
        .slice(0, 4); 
      options = cleaned;
    }

    if (!options.length || options.length < 4) {
      return res
        .status(500)
        .json({ message: "Failed to generate proper options" });
    }

    return res.status(200).json({ options });
  } catch (error) {
    console.error("Error in optiongenerator controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const topicCounters = {}; 

export const question_option = async (req, res) => {
  try {
    const { topic } = req.query;
    let { difficulty } = req.query;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    if (!difficulty) {
      difficulty = "easy";
    }

    if (!topicCounters[topic]) topicCounters[topic] = 1;
    const cnt = topicCounters[topic]++;

    const prompt = `
    You are generating a series of unique and progressively harder multiple-choice questions on the topic: "${topic}".
    
    This is Question Number: ${cnt}
    
    Instructions:
    - Generate a unique MCQ question on the above topic.
    - As the question number increases, increase the complexity and depth of the question.
    - This is question number ${cnt}, so make it ${cnt >= 3 ? "very easy" : cnt >= 5 ? "easy" : cnt >= 7 ? "medium" : cnt >= 10 ? "hard" : "very hard"} in difficulty.
    - Do NOT repeat previous questions.
    - Return the result strictly as a JSON array in this format:
      [question, option1, option2, option3, option4, correct option]
    - Place the correct option randomly among the 4 options.
    - Keep each option under 10 words.
    - Do NOT include markdown or explanation. Just return the array.
    `;
    

    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let output = [];

    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length === 6) {
        output = parsed;
      } else {
        throw new Error("Not a valid array");
      }
    } catch (err) {
      console.warn("JSON parse fallback:", err.message);
      const cleaned = text
        .replace(/[\[\]"',]/g, "")
        .split(/\n|;/)
        .map(str => str.trim())
        .filter(str => str.length > 0);

      if (cleaned.length >= 6) {
        output = cleaned.slice(0, 6);
      }
    }

    if (!Array.isArray(output) || output.length !== 6) {
      return res.status(400).json({
        message: "Failed to generate a valid format",
        raw: text,
      });
    }

    return res.json({
      message: "Unique question generated successfully!",
      data: output,
      questionNumber: cnt,
    });

  } catch (error) {
    console.error("Error in question_option controller", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
