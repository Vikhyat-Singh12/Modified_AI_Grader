import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useStudentStore } from "../store/useStudentStore";
import download from "../assets/download.png";
import dashboardImage from "../assets/stu/student_dashboard.png";
import dashboardImage2 from "../assets/stu/student_dashboard2.png";

function StudentDashboard() {
  const { user } = useAuthStore();
  const {
    assignments,
    submittedAssignments,
    getAllAssgnmentAndSubmittedAssignment,
    tests,
    submittedTests,
    getAllTestAndSubmittedTest,
    assignedTeacher,
    getAssignedTeacher,
    submitAssignment,
  } = useStudentStore();

  const subjects = user.subjects;

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [submittingAssignment, setSubmittingAssignment] = useState(null);

  const [toggle, setToggle] = useState(false);
  const [countdowns, setCountdowns] = useState({});


  
  useEffect(() => {
    getAllAssgnmentAndSubmittedAssignment({ subject: selectedSubject });
    getAllTestAndSubmittedTest({ subject: selectedSubject });
    getAssignedTeacher({ subject: selectedSubject });
  }, [selectedSubject]);

  const pendingAssignments = assignments.filter(
    (assignment) =>
      !submittedAssignments.some(
        (submitted) => submitted.assignmentId === assignment._id
      )
  );
    
    
  const pendingTests = tests.filter(
    (test) => !submittedTests.some((submitted) => submitted.testId === test._id)
  );
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newCountdowns = {};

      pendingTests?.forEach((test) => {
        const deadline = new Date(test.deadline);
        const diff = deadline - now;

        if (diff > 0) {
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const hours = Math.floor(diff / 1000 / 60 / 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newCountdowns[test._id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[test._id] = "❌ Failed";
        }
      });

      setCountdowns(newCountdowns);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up when unmounted
  }, [pendingTests]);

  
  const handleFileChange = (e, assignmentId) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [assignmentId]: e.target.files[0], // Store file by assignment ID
    }));
  };

  const handleSubmitAssignment = async (assignmentId) => {
    if (!selectedFiles[assignmentId])
      return toast.error("Please select a file");

    setSubmittingAssignment(assignmentId); // Start loading for this assignment

    const formData = new FormData();
    formData.append("fileUrl", selectedFiles[assignmentId]);
    formData.append("assignmentId", assignmentId);
    formData.append("subject", selectedSubject);

    await submitAssignment(formData);
    await getAllAssgnmentAndSubmittedAssignment({ subject: selectedSubject });

    setSubmittingAssignment(null); // Stop loading after submission

    // Clear the file after submission
    setSelectedFiles((prev) => ({
      ...prev,
      [assignmentId]: null,
    }));
  };


  return (
    <div className="w-full min-h-screen relative px-4 py-6">
      {/* Background Doodle Effect */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${dashboardImage})`,
            backgroundRepeat: "repeat",
            backgroundSize: "600px",
          }}
        ></div>
        <div className="w-full h-full bg-white opacity-80 absolute inset-0"></div>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        {/* Dashboard Title */}
        <div className="w-full border-b-4 border-[#0E7490] shadow-sm pb-3 mb-5 flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] text-transparent bg-clip-text">
            Dashboard
          </h2>

          <div className="relative flex bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] rounded-full p-1 shadow-inner w-[220px] h-10">
            {/* Sliding Background */}
            <div
              className={`absolute top-1 left-1 h-8 w-[104px] rounded-full bg-white shadow-md transition-all duration-300 ${
                toggle ? "translate-x-[108px]" : "translate-x-0"
              }`}
            ></div>

            {/* Button Labels */}
            <button
              onClick={() => setToggle(false)}
              className={`z-10 w-1/2 text-sm font-bold transition-colors duration-300 rounded-full ${
                !toggle ? "text-[#2155CD]" : "text-white"
              }`}
            >
              Assignments
            </button>

            <button
              onClick={() => setToggle(true)}
              className={`z-10 w-1/2 text-sm font-bold transition-colors duration-300 rounded-full ${
                toggle ? "text-[#2155CD]" : "text-white"
              }`}
            >
              Tests
            </button>
          </div>
        </div>

        {/* Student Profile & Subject Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
          <div className="flex flex-col sm:flex-row items-center w-full ">
            {/* Student Profile */}
            <div className="flex flex-col items-center">
              <div className="w-24 md:w-32 h-24 md:h-32 overflow-hidden rounded-lg shadow-md border-4 border-gray-200">
                <img
                  src={user.profilePicture || download}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mt-2 text-gray-800">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 italic">Student</p>
              <p className="text-xs md:text-sm text-gray-600">
                Class: {user.studentClass}
              </p>
            </div>

            {/* Subject Selection & Assigned Teacher */}
            <div className="flex flex-col w-full md:w-2/3 space-y-6 pl-6 md:pl-12 justify-center items-center">
              {/* Assigned Teacher */}
              <div className="flex items-center">
                <div className="w-20 md:w-24 h-20 md:h-24 rounded-full overflow-hidden border-2 md:border-4 border-gray-300 shadow-lg">
                  <img
                    src={assignedTeacher?.profilePicture || download}
                    alt="Teacher"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {assignedTeacher?.name || "No Teacher Assigned"}
                  </h3>
                  <p className="text-sm text-gray-500 italic">
                    Assigned Teacher
                  </p>
                </div>
              </div>

              {/* Subject Selector */}
              <div className="flex items-center">
                <label className="font-semibold text-[#0AA1DD] text-lg md:text-xl tracking-wide mr-3">
                  Subject:
                </label>
                <select
                  className="border-b-2 border-gray-500 focus:outline-none focus:border-blue-200 px-2 py-1 bg-transparent text-sm md:text-base w-32 md:w-48 cursor-pointer"
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setSelectedFiles({});
                    useStudentStore.setState({ assignedTeacher: null });
                  }}
                >
                  <option value="" disabled selected>
                    Select a subject
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dashboard Background Image */}
          <img
            src={dashboardImage2}
            alt="Dashboard Background"
            className="w-full h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[250px] lg:max-h-[300px] object-contain ml-auto hidden md:block"
          />
        </div>

        {/* Assignments Section */}
        <h3 className="text-2xl md:text-3xl font-extrabold my-6 text-[#F7EEDD] tracking-wide text-center bg-[#2155CD] px-4 py-2 rounded-lg shadow-md">
            {!toggle ? "Assignments" : "Tests"}
        </h3>

        {!toggle && pendingAssignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="border-collapse rounded-lg shadow-lg overflow-hidden w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] text-white">
                  <th className="p-3">Title</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Total Marks</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assignment</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingAssignments?.map((assignment, index) => {
                  const dueDate = new Date(assignment.deadline);
                  const currentDate = new Date();
                  const isDeadlinePassed = currentDate > dueDate; // Check if the deadline has passed

                  return (
                    <tr
                      key={assignment._id}
                      className={`text-center text-xs md:text-sm ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition-all`}
                    >
                      <td className="p-3">{assignment.title}</td>
                      <td className="p-3">
                        {dueDate.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "2-digit",
                        })}
                      </td>
                      <td className="p-3">{assignment.totalMarks}</td>

                      {/* Status: Show "Failed to Submit" if the deadline has passed */}
                      <td className="p-3 font-semibold">
                        {isDeadlinePassed ? (
                          <span className="text-red-600">
                            ❌ Failed to Submit
                          </span>
                        ) : (
                          "Pending"
                        )}
                      </td>

                      <td className="p-3">
                        <a
                          href={assignment.assignmentFile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 md:px-4 md:py-1 rounded-md shadow-md transition-all text-xs md:text-sm"
                        >
                          View
                        </a>
                      </td>

                      <td className="p-3">
                        <div className="flex flex-col items-center justify-center">
                          {/* File Input (Click Icon to Upload) */}
                          {!isDeadlinePassed && (
                            <label className="cursor-pointer text-blue-600 hover:text-blue-800 text-xl flex items-center">
                              📂
                              <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileChange(e, assignment._id)
                                }
                              />
                            </label>
                          )}

                          {/* Display Selected File Name */}
                          {selectedFiles[assignment._id] &&
                            !isDeadlinePassed && (
                              <p
                                className="text-xs text-gray-600 truncate max-w-[120px] mt-1 text-center"
                                title={selectedFiles[assignment._id].name}
                              >
                                {selectedFiles[assignment._id].name.length > 15
                                  ? selectedFiles[
                                      assignment._id
                                    ].name.substring(0, 12) + "..."
                                  : selectedFiles[assignment._id].name}
                              </p>
                            )}

                          {/* Submit Button: Disabled if deadline has passed */}
                          <button
                            className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md shadow-md transition-all text-xs md:text-sm mt-2 mx-auto  flex items-center justify-center ${
                              submittingAssignment === assignment._id ||
                              isDeadlinePassed
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubmitAssignment(assignment._id)
                            }
                            disabled={
                              submittingAssignment === assignment._id ||
                              isDeadlinePassed
                            }
                          >
                            {submittingAssignment === assignment._id ? (
                              <>
                                <svg
                                  className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                                  viewBox="0 0 24 24"
                                ></svg>
                                Submitting...
                              </>
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : toggle && pendingTests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="border-collapse rounded-lg shadow-lg overflow-hidden w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] text-white">
                  <th className="p-3">Title</th>
                  <th className="p-3">Due Date</th>
                  <th className="p-3">Total Marks</th>
                  <th className="p-3">Time Duration</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingTests?.map((test, index) => {
                  const dueDate = new Date(test.deadline);

                  return (
                    <tr
                      key={test._id}
                      className={`text-center text-xs md:text-sm ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition-all`}
                    >
                      <td className="p-3">{test.title}</td>
                      <td className="p-3">
                        {dueDate.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "2-digit",
                        })}
                      </td>
                      <td className="p-3">{test.totalMarks}</td>

                      <td className="p-3">{test.testDuration} minutes</td>

                      <td className="p-3 font-semibold">
                        {countdowns[test._id] ? (
                          <span className={countdowns[test._id] === "❌ Failed" ? "text-red-600" : "text-yellow-600"}>
                            {countdowns[test._id]}
                          </span>
                        ) : (
                          "⌛"
                        )}
                      </td>

                      <td className="p-3">
                        {new Date(test.deadline) > new Date() ? (
                          <Link
                            to={`/student-dashboard/${test._id}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out active:scale-95"
                          >
                            <span>📝 Start Test</span>
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </Link>
                        ) : (
                          <span className="text-red-600 font-semibold">❌ Deadline Passed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 bg-green-100 p-3 rounded-lg shadow-md text-center">
            <p className="text-green-900 font-semibold">
              ✅ No pending {toggle ? "Tests" : "Assignments"}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
