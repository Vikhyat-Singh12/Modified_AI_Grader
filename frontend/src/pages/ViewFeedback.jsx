import { useNavigate, useParams } from "react-router-dom";
import FeedbackImage from "../assets/Feedback.png"; 
import { useStudentStore } from "../store/useStudentStore";

function ViewFeedback() {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const {assignments, submittedAssignments} = useStudentStore();
  const submittedAssignment = submittedAssignments.find((submission) => submission._id === submissionId);
  const assignmentId = submittedAssignment.assignmentId;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  
  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white bg-gradient-to-r from-[#2155CD] to-[#41C9E2] p-4 rounded-lg text-center shadow-md">
        📋 Assignment Feedback
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8 mt-8 text-gray-800">
        <div className="md:w-1/2 space-y-6">
          <p className="text-lg"><strong>📌 Subject:</strong> {assignment.subject}</p>
          <p className="text-lg"><strong>📖 Assignment:</strong> {assignment.title}</p>
          <p className="text-lg">
            <strong>📅 Submitted Date:</strong>{" "}
            {new Date(submittedAssignment.submissionDateTime).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            {new Date(submittedAssignment.submissionDateTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
          <p className="text-xl font-semibold">
            ✅ Marks Obtained: <span className="text-[#0AA1DD] font-bold">{submittedAssignment.aiMarks} / {assignment.totalMarks}</span>
          </p>

          <div className="p-5 bg-[#DCF2F1] rounded-lg shadow-md border-l-4 border-[#2155CD]">
            <h3 className="text-lg font-semibold text-gray-800">💡 Your Feedback:</h3>
            <p className="text-gray-700 mt-2">{submittedAssignment.aiLongFeedback}</p>
          </div>

          {/* ✅ Navigate Back to Subject Details */}
          <button
            className="mt-6 bg-[#eb9809] hover:bg-[#d37f07] text-white px-8 py-3 rounded-lg shadow-md transition-all transform hover:scale-105 text-lg"
            onClick={() => navigate(-1)}
          >
            ⬅ Back to {assignment.subject}
          </button>
        </div>


      <div className="md:w-1/2 flex justify-center">
        <img 
          src={FeedbackImage} 
          alt="Feedback Illustration" 
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" 
        />
      </div>

      </div>
    </div>
  );
}

export default ViewFeedback;