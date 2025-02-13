import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const IntroPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home"); // Navigate to the Home Page
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Auto-navigate after 10 seconds
    },2000);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigate]);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center px-4 md:px-8 relative top-0">
      <div className="text-center text-gray-800 max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Animated Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-blue-400">ProjectSamarpan</span>
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          className="text-base sm:text-lg md:text-xl mb-6 mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Empowering individuals and communities through innovative solutions.
          Explore impactful projects that inspire and drive meaningful change.
        </motion.p>

        {/* Get Started Button */}
        <motion.button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-400 text-white font-semibold rounded-lg shadow-xl hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default IntroPage;
