import { useParams, useNavigate } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const TestInstruction = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { tests } = useStudentStore();

  const test = tests.find((test) => test._id === testId);

  const handleStart = () => {
    navigate(`/start-test/${testId}`);
  };

  const handleBack = () => {
    navigate("/student-dashboard");
  };

  if (!test) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500 font-semibold">Test not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 p-10"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold text-center text-blue-700 mb-8"
        >
          📘 Test Instructions
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { label: "📌 Title", value: test.title },
            { label: "📚 Subject", value: test.subject },
            { label: "🏫 Class", value: test.selectedClass },
            { label: "🧮 Total Marks", value: test.totalMarks },
            { label: "⏱️ Duration", value: `${test.testDuration} minutes` },
            { label: "📅 Deadline", value: new Date(test.deadline).toLocaleString() }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm"
            >
              <p className="font-medium text-gray-800">{item.label}</p>
              <p className="text-blue-900 font-semibold">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-500" /> General Instructions
          </h3>
          <ul className="space-y-3 text-gray-700 text-[1.05rem] list-disc list-inside">
            <li>No cheating or switching tabs is allowed. Any such activity may lead to auto-submission.</li>
            <li>Each question has only one correct answer. Choose wisely.</li>
            <li>You can navigate between questions using the in-app forward/backward buttons.</li>
            <li>Once the timer ends, the test is auto-submitted and cannot be reopened.</li>
            <li>⚠️ Avoid refreshing, closing the tab, or using browser back/forward buttons — it will auto-submit your test.</li>
            <li>Your answers are saved automatically in real-time — no manual save needed.</li>
            <li>Make sure your internet connection is stable before starting.</li>
            <li>Don't use multiple devices or browsers — it can flag the attempt as invalid.</li>
            <li>Complete the test in one sitting. Pausing or rejoining is not supported.</li>
            <li>You agree to these rules once you click on "Start Test".</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            🚀 Enter Test Arena <FaArrowRight />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="w-full sm:w-auto px-10 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-medium rounded-full transition-all duration-200 flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestInstruction;
