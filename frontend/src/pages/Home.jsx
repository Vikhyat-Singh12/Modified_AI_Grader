import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import aiGrading from "../assets/Home/ai-brain.jpg";
import timeEfficiency from "../assets/Home/nf14_(96).jpg";
import chatSupport from "../assets/Home/message.webp";
import aiHeroImage from "../assets/Home/User research-cuate.svg";
import aiIllustration from "../assets/Home/people creating robot-amico.svg";
import uploadImage from "../assets/Home/upload.png";
import aiVideo from "../assets/Home/aiimage.webm";
import gradesImage from "../assets/Home/grades.png";
import submissionImage from "../assets/Home/submission.png";
import feedbackImage from "../assets/Home/feedback1.png";
import improvementImage from "../assets/Home/improvement.png";
import whyChooseVideo from "../assets/Home/whychooseus.json";

function Home() {
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);

  const items = [
    {
      img: timeEfficiency,
      title: "Efficiency",
      text: "Saves time and effort.",
    },
    {
      img: aiGrading,
      title: "Accuracy",
      text: "Consistent and unbiased grading.",
    },
    { img: chatSupport, title: "Support", text: "24/7 chat support." },
  ];

  const steps = [
    {
      title: "Teacher Provides Assignment",
      text: "Teachers assign work to students.",
      image: improvementImage,
    },
    {
      title: "Student Uploads Solution",
      text: "Students submit their assignments.",
      image: uploadImage,
    },
    {
      title: "AI Evaluation",
      text: "AI analyzes and grades the work.",
      image: aiVideo,
    },
    {
      title: "Receive Feedback",
      text: "Get detailed feedback instantly.",
      image: feedbackImage,
    },
    {
      title: "Teacher Reviews",
      text: "Teacher evaluates the improved submission.",
      image: submissionImage,
    },
    {
      title: "Final Grade",
      text: "Teachers approve & finalize grades.",
      image: gradesImage,
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) =>
          (prevStep + 1) % steps.length
      );
    }, 2000); 

    return () => clearInterval(interval);
  }, [steps.length]);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  return (
    <div className="container mx-auto p-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mb-10">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-left text-5xl md:text-6xl font-bold text-blue-400 leading-tight hover:scale-105  transition-all duration-500">
            Crack your goal with <br /> AI-powered Grading
          </h1>
          <p className="text-gray-700 mt-4 text-xl font-bold">
            Automate grading, generate feedback, and improve learning
            efficiency.
          </p>
          <ul className="mt-4 text-blue-700 list-disc list-inside text-lg">
            <li>Instant assignment evaluation</li>
            <li>Personalized feedback for improvement</li>
            <li>Time-saving automated grading</li>
          </ul>
          <div className="mt-8">
            <Link to={user ? `${user?.role}-dashboard` : "/signup"}>
              <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:translate-y-[-10px] hover:drop-shadow-xl transition-all duration-500 active:translate-y-0">
                {user? "Go to Dashboard":"Get Started"}
              </button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center relative">
          <img
            src={aiHeroImage}
            alt="AI-powered Learning"
            className="w-[500px] h-auto object-cover"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={sectionRef}
        className="mt-9 flex flex-col-reverse md:flex-row items-center gap-10"
      >
        <div className="md:w-1/2">
          <Lottie
            animationData={whyChooseVideo}
            loop={true}
            className="max-w-[500px] max-h-[480px] w-full mx-auto h-auto"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold text-blue-700">Why Choose Us?</h2>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: isInView ? index * 0.5 : 0, duration: 0.5 }}
              className="p-4 bg-gray-800 text-white rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 px-5 rounded-lg text-black text-center mt-16">
        <h2 className="text-4xl font-bold mb-10">How It Works ??</h2>
        <hr className="h-[2px] bg-gray-500 border-0 mb-6" />

        {/* Large Screen View (Desktop) */}
        <div className="hidden md:flex relative items-center justify-center">
          <div className="flex space-x-6 overflow-hidden p-7">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-lg border-blue-400 hover:bg-white/20 transition-all transform duration-500 ${
                  index === currentStep
                    ? "scale-110 border-2 bg-blue-200"
                    : "scale-90 opacity-50 bg-gray-200"
                }`}
              >
                {step.image.endsWith(".webm") ? (
                  <video
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                    autoPlay
                    loop
                    muted
                  >
                    <source src={step.image} type="video/webm" />
                  </video>
                ) : (
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  />
                )}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-black-200 mt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View (1 Slide at a Time) */}
        <div className="md:hidden flex justify-center relative w-full h-56 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute w-[80%] p-6 rounded-xl shadow-lg bg-blue-200"
            >
              {steps[currentStep].image.endsWith(".webm") ? (
                <video
                  className="w-16 h-16 mx-auto mb-4 rounded-lg"
                  autoPlay
                  loop
                  muted
                >
                  <source src={steps[currentStep].image} type="video/webm" />
                </video>
              ) : (
                <img
                  src={steps[currentStep].image}
                  alt={steps[currentStep].title}
                  className="w-16 h-16 mx-auto mb-4 rounded-lg"
                />
              )}
              <h3 className="text-xl font-semibold">
                {steps[currentStep].title}
              </h3>
              <p className="text-black-200 mt-2">{steps[currentStep].text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Sign Up Section */}
      <section className="mt-16 flex flex-col md:flex-row items-center justify-between p-8 rounded-lg">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl font-bold text-blue-700">
            {user ? `Welcome Back, ${user.name}!` : "Join Us Today"}
          </h2>
          <p className="text-blue-500 text-lg pb-4">
            {user
              ? "You're already on the path to smarter grading. Keep exploring and making an impact!"
              : "Sign up now to automate your grading and save time."}
          </p>
          {!user && (
            <Link to="/signup">
              <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:translate-y-[-10px] hover:drop-shadow-xl transition-all duration-500 active:translate-y-0">
                Sign Up
              </button>
            </Link>
          )}
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src={aiIllustration}
            alt="AI Illustration"
            className="w-96 h-auto object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
