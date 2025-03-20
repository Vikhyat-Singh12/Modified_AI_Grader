import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useTeacherStore } from "../store/useTeacherStore";
import CreateAssignmentImg from "../assets/bg/createassignment.svg";

function CreateAssignment() {
  const { user } = useAuthStore();
  const { createAssignment } = useTeacherStore();
  const classes = user.assignedClasses.sort((a, b) => a - b);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [deadline, setDeadline] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [expectedAnswerFormat, setExpectedAnswerFormat] = useState("text");
  const [gradingCriteria, setGradingCriteria] = useState("");
  const [keywords, setKeywords] = useState("");
  const [sampleAnswer, setSampleAnswer] = useState("");
  const [plagiarismCheck, setPlagiarismCheck] = useState(false);
  const [assignmentFile, setAssignmentFile] = useState(null);

  const handleFileChange = (e) => {
    setAssignmentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !deadline ||
      !totalMarks ||
      !gradingCriteria ||
      !keywords ||
      !sampleAnswer ||
      !assignmentFile
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("selectedClass", selectedClass);
    formData.append("deadline", deadline);
    formData.append("totalMarks", totalMarks);
    formData.append("expectedAnswerFormat", expectedAnswerFormat);
    formData.append("gradingCriteria", gradingCriteria);
    formData.append("keywords", keywords);
    formData.append("sampleAnswer", sampleAnswer);
    formData.append("plagiarismCheck", plagiarismCheck);
    formData.append("assignmentFile", assignmentFile);

    await createAssignment(formData);
    toast.success(
      `Assignment Created: ${title} for Class ${selectedClass} - ${user.specializedSubject}`
    );

    setTitle("");
    setDescription("");
    setSelectedClass(classes[0]);
    setDeadline("");
    setTotalMarks("");
    setExpectedAnswerFormat("text");
    setGradingCriteria("");
    setKeywords("");
    setSampleAnswer("");
    setPlagiarismCheck(false);
    setAssignmentFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl flex">
        {/* Left Image Section */}
        <div className="w-1/3 flex flex-col items-center justify-center bg-yellow-300 p-6 rounded-l-lg ">
          <img
            src={CreateAssignmentImg}
            alt="Create Assignment"
            className="w-3/4 mb-4"
            style={{width:"fit-content"}}
          />
          <p className="text-lg text-gray-700 font-semibold text-center">
            Simplify your workload by creating assignments effortlessly!
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-2/3 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Create Assignment
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Select Class */}
            <div>
              <label className="block font-medium mb-1">Select Class</label>
              <select
                className="block w-full border border-gray-300 p-2 rounded-md"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                required
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    Class {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block font-medium mb-1">Subject</label>
              <input
                type="text"
                className="block w-full border border-gray-300 p-2 rounded-md bg-gray-200 cursor-not-allowed"
                value={user.specializedSubject}
                readOnly
              />
            </div>

            {/* Assignment Title */}
            <div>
              <label className="block font-medium mb-1">Assignment Title</label>
              <input
                type="text"
                className="block w-full border border-gray-300 p-2 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Total Marks */}
            <div>
              <label className="block font-medium mb-1">Total Marks</label>
              <input
                type="number"
                className="block w-full border border-gray-300 p-2 rounded-md"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                className="block w-full border border-gray-300 p-2 rounded-md"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium">Deadline</label>
              <input
                type="date"
                className="block w-full border p-2 rounded-md"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            {/* Expected Answer Format */}
            <div>
              <label className="block font-medium">
                Expected Answer Format
              </label>
              <select
                className="block w-full border p-2 rounded-md"
                value={expectedAnswerFormat}
                onChange={(e) => setExpectedAnswerFormat(e.target.value)}
              >
                <option value="text">Text Response</option>
                <option value="file">File Upload</option>
                <option value="code">Code Submission</option>
              </select>
            </div>

            {/* Grading Criteria */}
            <div>
              <label className="block font-medium">Grading Criteria</label>
              <input
                type="text"
                className="block w-full border p-2 rounded-md"
                value={gradingCriteria}
                onChange={(e) => setGradingCriteria(e.target.value)}
                required
              />
            </div>

            {/* Keywords */}
            <div>
              <label className="block font-medium">Keywords</label>
              <input
                type="text"
                className="block w-full border p-2 rounded-md"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                required
              />
            </div>

            {/* Sample Answer */}
            <div className="col-span-2">
              <label className="block font-medium">Sample Answer</label>
              <textarea
                className="block w-full border p-2 rounded-md"
                rows="2"
                value={sampleAnswer}
                onChange={(e) => setSampleAnswer(e.target.value)}
                required
              />
            </div>

            {/* Upload File */}
            <div className="col-span-2">
              <label className="block font-medium mb-1">
                Upload Assignment File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full border p-2 rounded-md"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button className="w-full bg-yellow-400 text-gray-800 px-4 py-2 rounded-md hover:bg-yellow-600 transition">
                Assign to Class {selectedClass}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAssignment;
