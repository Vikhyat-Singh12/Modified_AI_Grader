import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import { useMemo } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SubmitTest = () => {
  const { testId } = useParams(); 
  const { tests , submitTest} = useStudentStore();
  const {user} = useAuthStore();
  const navigate = useNavigate();

  const test = useMemo(() => {
    return tests.find((t) => t._id === testId);
  }, [tests, testId]);


  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState(
    test
      ? new Array(test.questions.length).fill({ option: "", isMarked: false , correct:""})
      : []
  );
  const [timeLeft, setTimeLeft] = useState(test ? test.testDuration * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!test) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

    const handleBeforeUnload = (e) => {
      if (!isSubmitted) {
        handleSubmit();
        e.preventDefault();
        e.returnValue = ""; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timeLeft, test]);
  


  const handleSubmit = async () => {
    let cnt = 0;

    const updatedAnswers = answers.map((answer, index) => {
      const correctAnswer = test.questions[index].answer;
      const isCorrect = answer.isMarked && answer.option === correctAnswer;
      if (isCorrect) cnt++;

      return {
        ...answer,
        correct: correctAnswer,
      };
    });

    

    setAnswers(updatedAnswers); 
    setIsSubmitted(true);

    await submitTest({
      testId,
      studentId: user._id,
      studentClass: user.studentClass,
      subject: test.subject,
      marks: (cnt * test.totalMarks) / test.questions.length,
      status: true,
      submissionDateTime: new Date().toISOString(),
      answers: updatedAnswers,
    });    
  };

     
  const handleOptionSelect = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQIndex] = {
      option,
      isMarked: true,
      correct: "",
    };
    setAnswers(updatedAnswers);
  };


  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secs % 60).toString().padStart(2, "0");
    return `${mins}:${seconds}`;
  };

  if (!test) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500 font-semibold">Test not found.</p>
      </div>
    );
  }

  const question = test.questions[currentQIndex];
  const selectedOption = answers[currentQIndex]?.option;

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto mt-16 p-8 bg-green-50 border border-green-300 rounded-lg shadow text-center"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-3">
          Test Submitted ✅
        </h2>
        <p className="text-green-600 mb-4 text-lg">
          Thank you for your submission!
        </p>
        <button
          onClick={() => navigate("/student-dashboard")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Go to Dashboard
        </button>
      </motion.div>
    );
  }

  // While test is ongoing
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-8 mt-8 bg-white shadow-2xl rounded-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-blue-700">
          Test: {test.subject}
        </h2>
        <div className="text-lg font-semibold text-red-600 bg-red-50 px-4 py-2 rounded shadow-inner">
          ⏰ Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question Block */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">
          Q{currentQIndex + 1}: {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((opt, idx) => (
            <div key={idx}>
              <label
                className={`flex items-center gap-2 p-3 rounded cursor-pointer border 
                ${
                  selectedOption === opt
                    ? "bg-blue-50 border-blue-500"
                    : "bg-gray-50 border-gray-300"
                } hover:bg-blue-100 transition`}
              >
                <input
                  type="radio"
                  name={`question-${currentQIndex}`}
                  checked={selectedOption === opt}
                  onChange={() => handleOptionSelect(opt)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span>{opt}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setCurrentQIndex((i) => Math.max(i - 1, 0))}
          disabled={currentQIndex === 0}
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition disabled:opacity-50"
        >
          ← Back
        </button>

        <button
          onClick={() =>
            setCurrentQIndex((i) =>
              Math.min(i + 1, test.questions.length - 1)
            )
          }
          disabled={currentQIndex === test.questions.length - 1}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          Submit Test
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SubmitTest;
