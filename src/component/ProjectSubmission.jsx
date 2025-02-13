/* eslint-disable no-unused-vars */
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import projectSubmissionService from "../appwrite/config"; // Import the service
import authService from "../appwrite/auth"; // Import the service

import { useSelector } from "react-redux";

const ProjectSubmission = () => {
  const [devName, setDevName] = useState('')
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    video: null,
    projectLink: "",
    batch: "",  // Add batch field to formData
    
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectSubmissionService.submitProject({ ...formData,devName, userId: userData.$id });
      toast.success("Project Submitted Successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error submitting project!");
      console.error("Error in project submission:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getCurrentUser();
        setDevName(response); // Set user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
          Submit Your Project
        </h2>

        {/* Batch Dropdown */}
        <motion.div
          className="mb-4 w-[20%] ml-[80%]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-md font-medium text-gray-700 mb-1">Select Batch</label>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          >
            <option value="">Select Batch</option>
            <option value="Cage-K1">Cage-K1</option>
            <option value="Cage-K2">Cage-K2</option>
            <option value="Cage-K3">Cage-K3</option>
            <option value="Cage-K4">Cage-K4</option>
            <option value="Cage-K5">Cage-K5</option>
            <option value="Cage-K6">Cage-K6</option>
            <option value="Cage-K7">Cage-K7</option>
            <option value="Cage-K8">Cage-K8</option>
            <option value="Cage-K9">Cage-K9</option>
            <option value="Cage-B1">Cage-B1</option>
            <option value="Cage-B2">Cage-B2</option>
            <option value="Cage-B3">Cage-B3</option>
            <option value="Cage-B4">Cage-B4</option>
            <option value="Cage-B5">Cage-B5</option>
            <option value="Cage-B6">Cage-B6</option>
          </select>
        </motion.div>

        {/* Project Title */}
        <motion.div
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label className="block text-md font-medium text-gray-700 mb-1">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter the title of your project"
            aria-label="Project Title"
            required
          />
        </motion.div>

        {/* Project Description */}
        <motion.div
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <label className="block text-md font-medium text-gray-700 mb-1">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter a brief description of your project"
            aria-label="Project Description"
            required
          />
        </motion.div>

        {/* Project Price */}
        <motion.div
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <label className="block text-md font-medium text-gray-700 mb-1">Project Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            placeholder="Enter the price of your project"
            aria-label="Project Price"
            required
          />
        </motion.div>

        {/* Project Image */}
        <motion.div
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <label className="block text-md font-medium text-gray-700 mb-1">Upload Project Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Project Image"
          />
        </motion.div>

        {/* Project Link */}
        <motion.div
          className="mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          <label className="block text-md font-medium text-gray-700 mb-1">Deployed Project Link (Optional)</label>
          <input
            type="url"
            name="projectLink"
            value={formData.projectLink || ""}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the link to your deployed project"
            aria-label="Deployed Project Link"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-105 transition duration-200"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Submit Project
        </motion.button>
      </motion.form>

      {/* Toast container for success message */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProjectSubmission;
