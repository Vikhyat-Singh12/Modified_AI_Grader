import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Clock,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import { useStudentStore } from "../store/useStudentStore";
import { useAuthStore } from "../store/useAuthStore";

const ReviewTestPage = () => {
  const { tests, submittedTests } = useStudentStore();
  const { user } = useAuthStore();

  const { submitTestId } = useParams();
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const submitData = submittedTests.find((s) => s._id === submitTestId);
  const testData = tests.find((t) => t._id === submitData?.testId);

  if (!submitData || !testData)
    return (
      <div className="text-center mt-10 text-lg animate-pulse">Loading…</div>
    );

  const question = testData.questions[currentQIndex];
  const studentAnswer = submitData.answers[currentQIndex];
  const totalQuestions = testData.questions.length;

  const attempted = submitData.answers.filter((a) => a.isMarked).length;
  const unAttempted = totalQuestions - attempted;
  const correctCount = submitData.answers.filter(
    (a) => a.option === a.correct
  ).length;
  const accuracy = ((correctCount / totalQuestions) * 100).toFixed(1);

  const percentDone = ((currentQIndex + 1) / totalQuestions) * 100;



  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-2xl mt-8 border border-gray-200">
      {/* ===== TITLE / META ===== */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#6A0DAD] to-[#41C9E2] bg-clip-text text-transparent">
          {testData.title}
        </h1>
        <p className="text-gray-500 mt-0.5">{`Subject: ${testData.subject}`}</p>

        <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <CalendarCheck size={16} />
            {new Date(submitData.submissionDateTime).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> {`Duration: ${testData.testDuration} min`}
          </span>
          {user && (
            <span className="flex items-center gap-1">👤 {user.name}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 text-center select-none">
        <StatBox colour="blue" label="Total Marks" value={testData.totalMarks}/>
        <StatBox colour="green" label="Obtained Marks" value={submitData.marks} />
        <StatBox colour="yellow" label="Attempted Questions" value={attempted} />
        <StatBox colour="gray" label="Correct Answer" value={correctCount} />
        <StatBox colour="purple" label="Accuracy" value={`${accuracy}%`} />
      </div>

      <div className="w-full bg-gray-200/60 rounded-full h-2 mb-8">
        <div
          style={{ width: `${percentDone}%` }}
          className="h-full rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#41C9E2] transition-all duration-300"
        />
      </div>

      <div className="p-6 sm:p-8 border border-gray-200 rounded-2xl bg-gray-50 shadow-inner relative">
        {!studentAnswer.isMarked && (
          <span className="absolute top-3 right-3 text-xs bg-yellow-400/80 text-gray-900 px-2 py-0.5 rounded-full animate-pulse">
            Not Attempted
          </span>
        )}

        <h3 className="font-semibold text-lg mb-4">
          {`Q${currentQIndex + 1}/${totalQuestions}. `} {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isUserAns = studentAnswer.option === opt;
            const isCorrectAns = question.answer === opt;

            let boxStyle = "bg-white border";
            let Icon = null;

            if (isCorrectAns) {
              boxStyle = "bg-green-300 border-green-500";
              Icon = Check;
            } else if (isUserAns && !isCorrectAns) {
              boxStyle = "bg-red-300 border-red-500";
              Icon = X;
            } else if (!studentAnswer.isMarked) {
              boxStyle = "bg-gray-300 border-gray-300";
              Icon = HelpCircle;
            }

            return (
              <div
                key={idx}
                className={`p-3 rounded-lg shadow-sm flex items-center gap-2 ${boxStyle} transition-all`}
              >
                {Icon && <Icon size={18} className="shrink-0" />}
                <span className="font-medium">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <NavButton
          disabled={currentQIndex === 0}
          onClick={() => setCurrentQIndex((i) => i - 1)}
          direction="prev"
        />
        <NavButton
          disabled={currentQIndex === totalQuestions - 1}
          onClick={() => setCurrentQIndex((i) => i + 1)}
          direction="next"
        />
      </div>
    </div>
  );
};


const StatBox = ({ colour, label, value }) => {
  const colourMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
    purple: "bg-purple-100 text-purple-800",
  };

  return (
    <div
      className={`${colourMap[colour]} p-4 rounded-lg font-semibold shadow-sm`}
    >
      <p className="text-xs tracking-wide uppercase">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  );
};

const NavButton = ({ disabled, onClick, direction }) => {
  const isPrev = direction === "prev";
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-md
        bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white 
        hover:scale-105 transition-all disabled:opacity-50`}
    >
      {isPrev ? <ArrowLeft size={18} /> : null}
      {isPrev ? "Previous" : "Next"}
      {!isPrev ? <ArrowRight size={18} /> : null}
    </button>
  );
};

export default ReviewTestPage;
