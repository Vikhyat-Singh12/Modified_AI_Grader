import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function NotFound() {
  // Particle Configuration
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#111827" },
          particles: {
            number: { value: 50 },
            color: { value: "#38bdf8" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />

      {/* AI Bot Animation */}
      <motion.img
        src="https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif"
        alt="AI Not Found"
        className="w-64 h-64 mx-auto z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* AI Chat Bubble */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-gray-800 text-blue-400 p-4 rounded-xl shadow-lg mt-4 z-10"
      >
        <Typewriter
          options={{
            strings: [
              "Oops! This page doesn't exist.",
              "Looks like you've wandered off...",
              "Let me guide you back home!",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </motion.div>

      {/* 404 Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-5xl font-extrabold text-red-400 mt-5 z-10"
      >
        404 Not Found
      </motion.h1>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-6 z-10"
      >
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
