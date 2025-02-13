/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import appwriteService from "../appwrite/config";

const ProjectCard = ({
  title,
  description,
  price,
  image,
  video,
  projectLink,
  userId,
  batch,
  devName,
  handleVideoClick,
  handleBuyProject,
  handleProjectLinkClick,
}) => {
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
          src={appwriteService.getFilePreview(image)}
          alt={title}
          className="w-full h-48 object-cover rounded-lg p-2 "
        />
     

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-600 mt-2 w-full h-12 overflow-auto ">
          <span className="font-semibold">Description : </span>{description}
        </p>
        <p className="mt-3 text-sm text-gray-500 w-full h-12 overflow-auto ">
          <strong>Uploaded by:</strong> {devName ? devName : "Loading..."} |{" "}
          <strong>Batch:</strong> {batch}
          {/* <strong>Phone:</strong> {"project.uploaderPhone"} */}
        </p>

        {price ? (
          <p className="text-lg font-bold text-green-600 mt-3">For Sale: ₹{price}</p>
        ) : (
          <p className="text-sm text-gray-500 mt-4">Not for Sale</p>
        )}
      </div>

      <div className="flex flex-wrap justify-between p-4 bg-gray-50 rounded-b-lg">
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
            onClick={() => handleProjectLinkClick(projectLink)}
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
      </div>
    </motion.div>
  );
};

export default ProjectCard;
