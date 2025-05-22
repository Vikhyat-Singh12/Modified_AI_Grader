import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useStudentStore } from "../store/useStudentStore";
import SubjectCard from "./SubjectCard"; 

import MathBg from "../assets/bg/maths_bg.png";
import ScienceBg from "../assets/bg/science_bg.jpg";
import HistoryBg from "../assets/bg/history_bg.jpg";
import EnglishBg from "../assets/bg/english_bg.jpg";

function SubjectDetails() {
  const { id } = useParams();
  const { assignments, submittedAssignments, getAllAssgnmentAndSubmittedAssignment, tests, submittedTests, getAllTestAndSubmittedTest } = useStudentStore();

  const [toggle, setToggle] = useState(false);

    
  useEffect(() => {
      getAllAssgnmentAndSubmittedAssignment({ subject: id });
      getAllTestAndSubmittedTest({ subject: id });
  },[id]);

  const subjects = {
    Mathematics: { name: "Mathematics", image: MathBg },
    Science: { name: "Science", image: ScienceBg },
    History: { name: "History", image: HistoryBg },
    English: { name: "English", image: EnglishBg },
    Computer: { name: "Computer", image: EnglishBg },
    Geography: { name: "Geography", image: EnglishBg },
  };

  const subject = subjects[id];
  const submitted = toggle ? submittedTests : submittedAssignments;

  return (
    <div className="w-full min-h-screen relative">
      {subject && (
        <div className="absolute inset-0 -z-10 w-full h-full">
          <div
            className="w-full min-h-full"
            style={{
              backgroundImage: `url(${subject.image})`,
              backgroundRepeat: "repeat",
              backgroundSize: "200px",
              backgroundPosition: "top left",
            }}
          ></div>

          <div className="absolute inset-0 bg-white opacity-90"></div>
        </div>
      )}

      {subject ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-[#2155CD] to-[#41C9E2] px-6 py-5 shadow-md rounded-lg gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              {subject.name}
            </h2>

            <div className="relative flex items-center bg-gradient-to-r from-[#0AA1DD] to-[#2155CD] rounded-full p-1 shadow-inner w-[220px] h-10">
              <div
                className={`absolute top-1 left-1 h-8 w-[104px] rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                  toggle ? "translate-x-[108px]" : "translate-x-0"
                }`}
              ></div>

              <button
                onClick={() => setToggle(false)}
                className={`z-10 w-1/2 h-full text-sm font-bold transition-colors duration-300 rounded-full ${
                  !toggle ? "text-[#2155CD]" : "text-white"
                }`}
              >
                Assignments
              </button>

              <button
                onClick={() => setToggle(true)}
                className={`z-10 w-1/2 h-full text-sm font-bold transition-colors duration-300 rounded-full ${
                  toggle ? "text-[#2155CD]" : "text-white"
                }`}
              >
                Tests
              </button>
            </div>
          </div>
            

          <div className="relative flex flex-wrap justify-center gap-4 mt-6 px-4">
            {submitted?.length === 0 && (
              <p className="text-center text-red-600 font-semibold text-4xl mt-10">
                No {toggle? "tests" : "assignments"} submitted yet.
              </p>
            )}
            {submitted?.map((submission) => {
              const assignment = assignments.find((a) => a._id === submission.assignmentId);
              const test = tests.find((t) => t._id === submission.testId);

              return (
                <SubjectCard
                  key={submission._id}
                  submission={submission}
                  assignment={toggle ? test : assignment}
                  id={id}
                  toggle={toggle}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 font-semibold text-xl mt-10">
          Subject not found.
        </p>
      )}
    </div>
  );
}

export default SubjectDetails;