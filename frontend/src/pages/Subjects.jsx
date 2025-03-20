import React from "react";
import { Link } from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import mathIcon from "../assets/subjects/maths.png";
import scienceIcon from "../assets/subjects/science.png";
import historyIcon from "../assets/subjects/history.png";
import englishIcon from "../assets/subjects/english.png";
import csIcon from "../assets/subjects/computer.png";
import geoIcon from "../assets/subjects/geography.png";


const subjects = {
  Mathematics: {
    id: 1,
    name: "Mathematics",
    code: "MATH101",
    icon: mathIcon,
    description: "AI checks accuracy, logical steps, and provides instant feedback on solutions.",
    bgColor: "bg-red-500",
  },
  Science: {
    id: 2,
    name: "Science",
    code: "SCI102",
    icon: scienceIcon,
    description: "AI evaluates explanations, experimental accuracy, and conceptual understanding.",
    bgColor: "bg-blue-300",
  },
  History: {
    id: 3,
    name: "History",
    code: "HIST103",
    icon: historyIcon,
    description: "AI assesses argument strength, historical accuracy, and source relevance.",
    bgColor: "bg-yellow-600",
  },
  English: {
    id: 4,
    name: "English",
    code: "ENG104",
    icon: englishIcon,
    description: "AI reviews grammar, coherence, vocabulary, and overall writing quality.",
    bgColor: "bg-gray-500",
  },
  Computer: {
    id: 5,
    name: "Computer",
    code: "CS105",
    icon: csIcon,
    description: "AI analyzes code logic, efficiency, and debugging solutions.",
    bgColor: "bg-green-500",
  },
  Geography: {
    id: 6,
    name: "Geography",
    code: "GEO106",
    icon: geoIcon,
    description: "AI evaluates map analysis, geographic concepts, and spatial reasoning.",
    bgColor: "bg-purple-500",
  },
};


function Subjects() {
  const {user} = useAuthStore();
  const selectedSubjects = user?.subjects || [];

  
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-50 p-10 overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-32 h-32 bg-blue-100 rounded-full opacity-50 top-10 left-20 animate-pulse"></div>
        <div className="absolute w-40 h-40 bg-blue-100 rounded-full opacity-50 top-40 right-20 animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-blue-100 rounded-full opacity-50 bottom-10 left-40 animate-pulse"></div>
        <div className="absolute w-36 h-36 bg-blue-100 rounded-full opacity-50 bottom-20 right-10 animate-pulse"></div>
      </div>

      <h2 className="text-4xl font-bold mb-6 z-10">Explore Selected Subjects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl z-10">
        {selectedSubjects.map((subjectKey) => {
          const subject = subjects[subjectKey];
          return (
            <div
              key={subject.id}
              className="relative bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 transition-all transform hover:scale-105 hover:shadow-2xl hover:brightness-110"
            >
              {/* Half-circle background effect */}
              <div className={`absolute top-0 left-0 w-full h-1/3 rounded-b-full ${subject.bgColor} opacity-40`} />

              <img src={subject.icon} alt={subject.name} className="w-20 h-20 relative z-10" />
              <h3 className="text-2xl font-semibold mt-4">{subject.name}</h3>
              <p className="text-gray-500 text-sm">{subject.code}</p>
              <p className="text-gray-600 mt-2 text-sm">{subject.description}</p>

              <Link
                to={`/subjects/${subjectKey}`}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition inline-block"
              >
                Explore More →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Subjects;