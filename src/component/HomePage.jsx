/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import projectSubmissionService from "../appwrite/config";

const HomePage = () => {
  const [first, setfirst] = useState([])
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); // To store filtered projects
  const [selectedBatch, setSelectedBatch] = useState(""); // Selected batch
  const navigate = useNavigate(); // For navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in
  


 
  // Fetch projects from Appwrite database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectSubmissionService.getAllProjects();
        
        setfirst(response.documents);        
        setProjects(response.documents || []);
        setFilteredProjects(response.documents || []); // Initially set all projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user"); // Example check (use real auth logic)
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle batch selection
  const handleBatchChange = (event) => {
    const selectedBatch = event.target.value;
    setSelectedBatch(selectedBatch);

    // Filter projects based on the selected batch
    if (selectedBatch === "") {
      setFilteredProjects(projects); // Show all projects if no batch is selected
    } else {
      const filtered = projects.filter((project) => project.batch === selectedBatch);
      setFilteredProjects(filtered);
    }
  };

  // Handle buy project action
  const handleBuyProject = (project) => {
    if (isLoggedIn) {
      navigate("/chat", { state: { uploaderName: project.uploaderName, projectName: project.name } });
      toast.success(`Chat with ${project.uploaderName} to buy the project.`);
    } else {
      toast.error("You must be logged in to add a project!");
    }
  };

  // Handle add project navigation
  const handleAddProject = () => {
    if (isLoggedIn) {
      navigate("/project-submission"); // Navigate to project submission page
    } else {
      toast.error("You must be logged in to add a project!");
    }
  };

  // Handle video click action
  const handleVideoClick = (video) => {
    if (isLoggedIn) {
      window.open(video, "_blank"); // Open the video in a new tab
    } else {
      toast.error("You must be logged in to watch video of this project!");
    }
  };

  // Handle code click action
  const handleProjectLinkClick = (projectLink) => {
    if (isLoggedIn) {
      window.open(projectLink, "_blank"); // Open the video in a new tab
    } else {
      toast.error("You must be logged in to see the project!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-8">
        All Uploaded Projects
      </h1>

      {/* Batch Filter Dropdown */}
      <div className="mb-6  md:ml-[80%]">
        <label htmlFor="batch" className="text-md font-semibold text-gray-800 mr-2">
          Filter by Batch:
        </label>
        <select
          id="batch"
          value={selectedBatch}
          onChange={handleBatchChange}
          className="px-3 py-1 border rounded-lg"
        >
           <option value="">All Batch</option>
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
          {/* Add more options based on available batches */}
        </select>
      </div>

      {/* Add Project Button */}
      <motion.button
        onClick={handleAddProject}
        className="mb-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-indigo-500 font-semibold transition-all duration-200 shadow-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        Add Project
      </motion.button>

      {/* Grid container for displaying filtered project cards */}
      <div>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={project.id || index} className="p-2 w-full  md:w-1/4 lg:w-1/4 inline-block">
              <ProjectCard
                {...project}
                handleBuyProject={handleBuyProject}
                handleVideoClick={handleVideoClick}
                handleProjectLinkClick={handleProjectLinkClick}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects available for the selected batch.</p>
        )}
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;