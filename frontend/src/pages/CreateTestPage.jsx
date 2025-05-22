import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTeacherStore } from "../store/useTeacherStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Sparkles, Trash2 } from "lucide-react";

const TestPage = () => {
  const { user } = useAuthStore();
  const { getOptions, getQuestion_options, createTest, isCreattingTest } =
    useTeacherStore();
  const classes = user.assignedClasses.sort((a, b) => a - b);

  const [testDetails, setTestDetails] = useState({
    title: "",
    selectedClass: classes[0],
    subject: user.specializedSubject || "",
    totalMarks: "",
    deadline: "",
    testDuration: "",
  });

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleTestChange = (e) => {
    const { name, value } = e.target;
    setTestDetails({ ...testDetails, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.slice(-1), 10);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "answer") {
      updatedQuestions[index].answer = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const handleGenerateQuestion = async () => {
    if (!topic) return toast.error("Please enter a topic first.");

    try {
      const data = await getQuestion_options({ topic, difficulty });
      if (!data || data.length < 6)
        return toast.error("Insufficient question data received.");

      const newQuestion = {
        question: data[0],
        options: data.slice(1, 5),
        answer: data[5],
      };

      setQuestions([...questions, newQuestion]);
      toast.success("Question generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate question.");
    }
  };

  const handleMagicClick = async (index) => {
    const questionText = questions[index].question.trim();
    if (!questionText) return toast.error("Please enter a question first.");

    try {
      const res = await getOptions({ question: questionText });
      const opts = res.options;

      if (!opts || opts.length !== 5)
        return toast.error("Invalid options received.");

      const updatedQuestions = [...questions];
      updatedQuestions[index].options = opts.slice(0, 4);
      updatedQuestions[index].answer = opts[4];
      setQuestions(updatedQuestions);

      toast.success("Options generated!");
    } catch (error) {
      console.error(error);
      toast.error("Magic generation failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTest({
      ...testDetails,
      questions,
    });

    setTestDetails({
      title: "",
      selectedClass: classes[0],
      subject: user.specializedSubject,
      totalMarks: "",
      deadline: "",
      testDuration: "",
    });
    setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
    setTopic("");
    setDifficulty("easy");
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-gray-800 mb-8 text-center"
      >
        🎯 AI-Powered Quiz Generator
      </motion.h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Test Metadata */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white p-6 rounded-xl shadow-lg"
        >
          <input
            type="text"
            name="title"
            placeholder="📝 Test Title"
            value={testDetails.title}
            onChange={handleTestChange}
            required
            className="input"
          />
          <select
            name="selectedClass"
            value={testDetails.selectedClass}
            onChange={handleTestChange}
            required
            className="input"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                📘 Class {cls}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="subject"
            value={user.specializedSubject}
            readOnly
            className="input text-gray-500 bg-gray-100 cursor-not-allowed"
          />
          <input
            type="number"
            name="totalMarks"
            placeholder="🎯 Total Marks"
            value={testDetails.totalMarks}
            onChange={handleTestChange}
            required
            className="input"
          />
          <input
            type="date"
            name="deadline"
            value={testDetails.deadline}
            onChange={handleTestChange}
            required
            className="input"
          />
          <input
            type="number"
            name="testDuration"
            placeholder="⏳ Duration (mins)"
            value={testDetails.testDuration}
            onChange={handleTestChange}
            required
            className="input"
            min={1}
          />
        </motion.div>

        {/* AI Generator */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            type="text"
            placeholder="🎓 Topic e.g. Algebra"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input w-full"
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="input w-full"
          >
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
          <button
            type="button"
            onClick={handleGenerateQuestion}
            className="btn-primary bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transform transition"
          >
            Question Generate
          </button>
        </motion.div>

        {/* Question Cards */}
        {questions.map((q, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4 relative"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 flex-wrap">
              <p className="text-lg font-bold text-gray-700">
                🧠 Question {idx + 1}
              </p>

              <div className="flex flex-row gap-3 sm:items-center">
                <button
                  type="button"
                  onClick={() => handleMagicClick(idx)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 ease-in-out flex items-center gap-2"
                  title="SmartOptions"
                >
                  SmartOptions <Sparkles className="w-5 h-5 animate-pulse" />
                </button>

                <button
                  type="button"
                  onClick={() => removeQuestion(idx)}
                  className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  title="Remove Question"
                >
                  <Trash2 className="w-5 h-5" />
                  <span >Remove</span>
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Type your question here..."
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(idx, "question", e.target.value)
              }
              required
              className="input"
            />

            {q.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) =>
                  handleQuestionChange(idx, `option${i}`, e.target.value)
                }
                required
                className="input"
              />
            ))}

            <select
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(idx, "answer", e.target.value)
              }
              required
              className="input"
            >
              <option value="">✅ Select Correct Answer</option>
              {q.options.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt || `Option ${i + 1}`}
                </option>
              ))}
            </select>
          </motion.div>
        ))}

        {/* Bottom Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          <button
            type="button"
            onClick={addQuestion}
            className="btn-secondary hover:bg-blue-100 transition"
          >
            ➕ Add New Question
          </button>
          {!isCreattingTest && (
            <button
              type="submit"
              className="btn-primary bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              🚀 Create Test Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TestPage;
