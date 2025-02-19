/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  toast } from "react-toastify";
import { FaHeart, FaEye } from "react-icons/fa";
import appwriteConfig from "../appwrite/config";

const ProjectCard = ({
  id,
  currentUserId,
  title,
  description,
  price,
  image,
  video,
  projectLink,
  userId,
  batch,
  devName,
  views,
  handleVideoClick,
  handleBuyProject,
}) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [view, setView] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Example check (use real auth logic)
    setView(views?views:0);
    console.log(view);
    
    if (storedUser) {
      setIsLoggedIn(true);
    }

  }, [])

  // ✅ Fetch Likes on Component Mount
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likedByArray = await appwriteConfig.getLikes(id);
        setLikes(likedByArray.length || 0);
        
        
        setLiked(likedByArray.includes(currentUserId));
      } catch (error) {
        console.error("Error fetching likes:", error);
        setLikes(0);
      }
    };

    fetchLikes();
  }, [id, currentUserId]);


  // ✅ Update View Count
  const handleUpdateViews = async () => {
    try {
      const updatedViews = await appwriteConfig.updateViews(id);
      if (updatedViews !== undefined) {
        setView(updatedViews); // Ensure state updates correctly
        console.log(view);
        
      }
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };


  // Handle code click action
  const handleProjectLinkClick = async () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to see the project!");
      return;
    }
  
    try {
      window.open(projectLink, "_blank"); // ✅ Open project in a new tab
      await handleUpdateViews(); // ✅ Call view update before opening the project

    } catch (error) {
      console.error("Error handling project click:", error);
    }
  };
  

  // ✅ Optimized Like Handler
  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to like the project!");
      return;
    }
    try {
      const updatedLikes = await appwriteConfig.updateLikes(id, currentUserId);
      setLikes(updatedLikes.length);
      
      setLiked(updatedLikes.includes(currentUserId));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  if (!title) {
    return <p className="text-center text-gray-500">No project available.</p>;
  }

  
  

  return (
    <motion.div
      key={userId}
      className="bg-white shadow-xl rounded-lg overflow-hidden max-w-sm mx-auto transition-transform transform hover:scale-101"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={appwriteConfig.getFilePreview(image)}
        alt={title}
        className="w-full h-48 object-cover rounded-lg p-2"
      />

      <div className="p-6">
        <h2 className="text-xl h-13 overflow-auto font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-600 mt-2 w-full h-12 overflow-auto">
          <span className="font-semibold">Description: </span>
          {description}
        </p>
        <p className="mt-2 text-sm text-gray-500 w-full overflow-auto">
          <strong>Uploaded by:</strong> {devName || "Loading..."}
        </p>
        <p className="mt-2 text-sm text-gray-500 w-full overflow-auto">
          <strong>Batch:</strong> {batch}
        </p>

        {price ? (
          <p className="text-lg font-bold text-green-600 mt-3">For Sale: ₹{price}</p>
        ) : (
          <p className="text-sm text-gray-500 mt-4">Not for Sale</p>
        )}
      </div>

      <div className="flex flex-wrap justify-between items-center p-4 bg-gray-50 rounded-b-lg">
        {video && (
          <button
            onClick={() => handleVideoClick(video)}
            className="mb-2 px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md hover:bg-blue-500 transition-colors w-full sm:w-auto"
          >
            Watch Video
          </button>
        )}
        {projectLink && (
          <button
            onClick={handleProjectLinkClick}
            className="mb-2 px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-400 transition-colors w-full sm:w-auto"
          >
            View Project
          </button>
        )}
        <button
          onClick={() => handleBuyProject(title)}
          className="mb-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400 text-white rounded-lg shadow-md transition-colors w-full sm:w-auto"
        >
          Buy Project
        </button>

        {/* ✅ Like Icon */}
        <div
          className="flex flex-col items-center cursor-pointer p-2 rounded-lg transition-transform hover:scale-103  absolute top-[59%] md:top-[62%] right-0"
          onClick={handleLikeClick}
        >
          <FaHeart className={`text-lg ${liked ? "text-red-500" : "text-gray-400"}`} />
          <span className="text-gray-700 font-semibold text-sm">{likes}</span>
        </div>

        {/* ✅ View Icon */}
        <div className="flex flex-col items-center cursor-pointer p-2 rounded-lg transition-transform hover:scale-102 absolute top-[69%] md:top-[72%] right-0">
          <FaEye className="text-lg text-gray-500" />
          <span className="text-gray-700 font-semibold text-sm">{view}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
