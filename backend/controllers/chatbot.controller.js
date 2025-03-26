import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const chatbot = async (req, res) => {
  try {
    const { text, history } = req.query; // Extract user input and history

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
      return res
        .status(500)
        .json({
          message: "Error generating response"
        });
    }
  } catch (error) {
    console.error("Error in chatbot controller", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
};
