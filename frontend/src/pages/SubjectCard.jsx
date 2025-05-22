import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const SubjectCard = ({ submission, assignment, id, toggle }) => {
  const navigate = useNavigate();

  const totalQuestions = submission.answers?.length || 0;
  const attempted = submission.answers?.filter((a) => a.isMarked).length || 0;
  const correctAnswers =
    submission.answers?.filter((a) => a.isMarked && a.option === a.correct)
      .length || 0;
  const accuracy =
    attempted > 0 ? Math.round((correctAnswers / attempted) * 100) : 0;


  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4">
      <div
        className="relative h-[380px] w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between 
                           border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl hover:brightness-110 duration-300"
      >
        <h3
          className="text-xl font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-r from-[#6A0DAD] to-[#41C9E2] 
               drop-shadow-md tracking-wide uppercase"
        >
          {assignment.title}
        </h3>

        <p className="text-gray-700">
          <strong>Total Marks:</strong> {assignment.totalMarks}
        </p>
        <p className="text-green-600 font-semibold">
          <strong>Marks Obtained:</strong>{" "}
          {submission.aiMarks || submission.marks}
        </p>

        {toggle && (
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-800">
            <div className="bg-gradient-to-r from-[#6A0DAD] to-[#41C9E2] text-white px-3 py-2 rounded-xl shadow-md text-center">
              <p className="font-semibold">Total Questions</p>
              <p className="text-lg font-bold">{totalQuestions}</p>
            </div>
            <div className="bg-yellow-400 text-black px-3 py-2 rounded-xl shadow-md text-center">
              <p className="font-semibold">Attempted</p>
              <p className="text-lg font-bold">{attempted}</p>
            </div>
            <div className="bg-green-500 text-white px-3 py-2 rounded-xl shadow-md text-center">
              <p className="font-semibold">Correct</p>
              <p className="text-lg font-bold">{correctAnswers}</p>
            </div>
            <div className="bg-blue-500 text-white px-3 py-2 rounded-xl shadow-md text-center">
              <p className="font-semibold">Accuracy</p>
              <p className="text-lg font-bold">{accuracy}%</p>
            </div>
          </div>
        )}


        {/* Buttons */}
        {!toggle && (
          <div className="flex flex-row gap-3 mt-3">
            {/* Assignment Button */}
            <div className="relative group">
              <a
                href={assignment.assignmentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#eda909] 
            text-white rounded-lg shadow-lg hover:bg-[#D4A017] 
            hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">📄</span>
              </a>

              {/* Tooltip */}
              <div
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
        bg-black text-white text-xs font-semibold px-3 py-1 rounded-md opacity-0 
        group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                Assignment
              </div>
            </div>

            {/* Submission Button */}
            <div className="relative group">
              <a
                href={submission.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center 
           bg-[#eda909] text-white rounded-lg shadow-lg 
           hover:bg-[#D4A017] hover:scale-110 transition-all duration-300"
              >
                <span className="text-2xl">📝</span>
              </a>

              {/* Tooltip */}
              <div
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
        bg-black text-white text-xs font-semibold px-3 py-1 rounded-md opacity-0 
        group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              >
                Submission
              </div>
            </div>
          </div>
        )}

        {/* Feedback */}
        <div className="mt-3">
          {!toggle && <p className="text-gray-800 font-medium">
            🏷 Feedback: {submission.aiShortFeedback}
          </p>}

          {/* View Full Feedback Button */}
          <div
            onClick={() => navigate(!toggle?`/subjects/${id}/${submission._id}`:`/subjects/test/${id}/${submission._id}`)}
            className="mt-2 bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white px-3 py-2 rounded-lg shadow-md hover:from-[#4F46E5] hover:to-[#2563EB] transition-all duration-300 inline-flex items-center justify-center gap-2 text-center w-auto hover:cursor-pointer hover:scale-110"
          >
            {toggle ? (
              <>
                <Eye className="w-4 h-4" />
                Review Test
              </>
            ) : (
              "View Full Feedback"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
