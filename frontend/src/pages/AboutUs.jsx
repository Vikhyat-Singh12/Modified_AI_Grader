import React from "react";
import { motion } from "framer-motion";
import Vikhyat from "../assets/pic/Vikhyat.jpg";
import Prakash from "../assets/pic/Prakash.jpg";
import Riya from "../assets/pic/Riya.jpg";

function AboutUs() {
  const teamMembers = [
    {
      name: "Vikhyat Singh",
      role: "Information Technology",
      image: Vikhyat,
    },
    {
      name: "Prakash Raj",
      role: "Computer Science & Engineering",
      image: Prakash,
    },
    {
      name: "Riya Verma",
      role: "Computer Science & Engineering",
      image: Riya,
    },
    {
      name: "Olivia Wilson",
      role: "CONTENT CREATOR",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const teamVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div>
      {/* About AI Grader */}
      <div className="text-center py-8 bg-gray-50">
        <span className="text-6xl md:text-8xl font-extrabold inline-block hover:scale-110 transition-all duration-500 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-5">
          About{" "}
          <span className=" inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-4xl md:text-6xl hover:scale-105 transition-all duration-500">
            AI GRADER
          </span>
        </span>

        <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed hover:scale-110 transition duration-500">
          AI GRADER is an advanced AI-powered grading and feedback system
          designed to help educators and students improve learning efficiency.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 hover:translate-y-[-10px] hover:drop-shadow-xl transition-all duration-500 active:translate-y-0"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-blue-200 p-10 rounded-lg flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-red-800 text-5xl font-bold hover:scale-105 transition-all duration-500 ">
              AI Grader
            </h1>
            <h2 className="text-3xl font-semibold mt-8">
              Benefits of AI in Automated Assessment
            </h2>
            <p className="text-sm mt-4">
              Learn how AI Grader apps are transforming education by automating
              assessment tasks and providing tailored feedback to improve
              student outcomes. Our ‘What to Know’ guide covers key aspects of
              these AI grading tools. Artificial Intelligence (AI) has
              revolutionized the education and assessment sector by automating
              evaluations, reducing manual effort, and improving efficiency.
            </p>
            <div className="mt-6 flex space-x-4">
              <button className="bg-green-400 hover:bg-red-500 text-white font-bold py-2 px-6 rounded">
                Try it Free
              </button>
              <button className="bg-white text-blue-900 font-bold py-2 px-6 rounded border">
                Learn more
              </button>
            </div>
          </div>
          <div className="mt-6 mx-auto md:mt-0 ">
            <lottie-player
              id="firstLottie"
              autoplay
              loop
              mode="normal"
              src="https://lottie.host/1c6bcae1-ab63-4045-801f-f7ee90f7aba4/ZBll39E1mH.json"
              background="transparent"
              className="max-w-[460px] max-h-[400px] w-full h-auto"
            ></lottie-player>
          </div>
        </div>

        {/* Side-by-Side Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* What is an AI Grader? */}
          <div className="bg-gray-100 p-10 rounded-lg">
            <h2 className="text-4xl font-bold text-teal-300 hover:scale-105 transition-all duration-500">
              What is an AI Grader?
            </h2>

            <div className="mt-6">
              <lottie-player
                id="firstLottie"
                autoplay
                loop
                mode="normal"
                src="https://lottie.host/67c386a9-12cc-4e4c-a271-66215003c29d/J5iYDzc4Pt.json"
                background="transparent"
                className="max-w-[400px] max-h-[400px] w-full mx-auto h-auto"
              ></lottie-player>
            </div>

            <ul className="text-gray-700 mt-10 text-sm">
              <li>
                <strong>Definition:</strong> An AI grader is a software tool
                that uses artificial intelligence (AI) to automatically assess
                and grade student assignments and exams.
              </li>
              <li className="mt-2">
                <strong>Functionality:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>
                    <strong>Automates Grading:</strong> Reduces manual grading
                    time by automatically scoring responses based on set
                    criteria.
                  </li>

                  <li>
                    <strong>Consistency:</strong> Ensures uniform grading by
                    applying the same standards to all assessments.
                  </li>

                  <li>
                    <strong>Plagiarism Detection:</strong> Identifies copied
                    content using advanced similarity checks.
                  </li>

                  <li>
                    <strong>Multi-Subject Support :</strong> Works with various
                    subjects, including essays, coding assignments, and MCQs.
                  </li>

                  <li>
                    <strong>Feedback:</strong> Provides instant, actionable
                    feedback to students, which enhances learning.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* How to Integrate AI Grader */}
          <div className="bg-orange-100 text- p-10 rounded-lg">
            <h2 className="text-blue-500 text-3xl font-bold hover:scale-105 transition-all duration-500">
              How can I integrate an AI grader into my classroom?
            </h2>

            <p className="text-lg mt-4">
              Integrating an AI grader into your classroom involves several
              steps:
            </p>

            <ul className="list-decimal list-inside mt-4 text-sm">
              <li>
                <strong>First, Choose the Right Tool:</strong> Select an AI
                grader that fits your educational needs and goals.
              </li>
              <li>
                <strong>Training and Onboarding:</strong> Educators should
                receive proper training to use AI grading tools effectively.
              </li>
              <li>
                <strong>Monitoring and Feedback:</strong> Continuously monitor
                the AI grader’s effectiveness and gather feedback from students
                and teachers for improvements.
              </li>
              <li>
                <strong>Continuous Improvement:</strong> Use feedback to make
                ongoing adjustments and improve how AI graders support grading
                and learning.
              </li>
            </ul>

            <div className="md:w mt-6 md:mt-">
              <lottie-player
                id="firstLottie"
                autoplay
                loop
                mode="normal"
                src="https://lottie.host/33a686bb-5084-4de9-8374-c6a28d6891e3/esY7My5G0I.json"
                background="transparent"
                className="max-w-[460px] max-h-[480px] w-full mx-auto h-auto"
              ></lottie-player>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-green-100 text- p-8 rounded-lg">
          <div>
            <h2 className="text-blue-500 text-4xl font-bold hover:scale-105 transition-all duration-500">
              What are the benefits of using an AI Grader?
            </h2>
            <p className="mt-4 text-lg">
              AI graders bring several benefits to the educational process,
              making grading more efficient and effective for educators while
              enhancing learning experiences for students.
            </p>

            {/* Teacher Benefits */}
            <h3 className="text-lg font-bold mt-6">
              AI Grader Benefits for Teachers:
            </h3>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>
                <strong>Time Efficiency:</strong> Reduces grading time by
                automating assessments.
              </li>
              <li>
                <strong>Consistency in Grading:</strong> Ensures fairness and
                transparency.
              </li>
              <li>
                <strong>Objective Assessment:</strong> Minimizes personal bias
                in grading.
              </li>
              <li>
                <strong>Data Insights:</strong> Provides detailed analytics on
                student performance.
              </li>
              <li>
                <strong>Scalability:</strong> Handles a large number of
                assignments efficiently.
              </li>
            </ul>

            {/* Student Benefits */}
            <h3 className="text-lg font-bold mt-6">
              AI Grader Benefits for Students:
            </h3>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>
                <strong>Immediate Feedback:</strong> Real-time feedback on
                assignments.
              </li>
              <li>
                <strong>Accessibility:</strong> Students can access feedback
                outside class hours.
              </li>
              <li>
                <strong>Personalized Learning:</strong> Tailored feedback based
                on performance.
              </li>
              <li>
                <strong>Objective Evaluation:</strong> Unbiased and consistent
                grading.
              </li>
              <li>
                <strong>Enhanced Engagement:</strong> Encourages active learning
                and motivation.
              </li>
            </ul>
          </div>

          <lottie-player
            id="firstLottie"
            autoplay
            loop
            mode="normal"
            src="https://lottie.host/f7bf96dc-6d39-4277-bc50-94a519c05384/k72tk98zFm.json"
            background="transparent"
            className="max-w-[580px] max-h-[480px] w-full mx-auto h-auto"
          ></lottie-player>
        </div>

        
        <hr className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 border-0 mt-12 shadow-xl" />

        {/* Team Section */}
        <div className="text-center mt-12">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-800"
          >
            Meet The Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-600 mt-2 text-xl"
          >
            Behind The Creative Process Of Building Your Brand
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-9">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={teamVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl"
              >
                <div className="w-40 h-52 rounded-lg overflow-hidden border-4 border-yellow-400 relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
