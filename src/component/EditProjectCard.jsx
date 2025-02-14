/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import appwriteService from "../appwrite/config";
import {  toast } from "react-toastify";

const EditProjectCard = ({
  title,
  description,
  price,
  image,
  projectLink,
  userId,
  $id, // Project ID
  handleDeleteProject,
  handleProjectLinkClick
}) => {
  const navigate = useNavigate(); // To navigate to the EditProjectSubmission page

  const handleEditClick = () => {
    // Navigate to the EditProjectSubmission page with the project ID
    navigate(`/edit-project/${$id}`, {
      state: { title, description, price, image, projectLink, userId },
    });
  };

  // const handleDeleteClick = () => {
  //   const toastId = toast.warn(
  //     <div>
  //       <p>Are you sure you want to delete this project?</p>
  //       <div className="flex gap-2 justify-center mt-2">
  //         <button
  //           onClick={() => confirmDelete(toastId)}
  //           className="px-3 py-1 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
  //         >
  //           Yes, Delete
  //         </button>
  //       </div>
  //     </div>,
  //     {
  //       position: "top-center",
  //       autoClose: false, // Prevent auto-dismiss
  //       closeOnClick: false,
  //       hideProgressBar: true,
  //       draggable: false,
  //     }
  //   );
  // };
  
  // const confirmDelete = async (toastId) => {
  //   try {
  //     toast.dismiss(toastId); // Close the confirmation toast
  //     const deleteToastId = toast.loading("Deleting project...", {
  //       position: "top-right",
  //     });
  
  //     await handleDeleteProject($id); // Wait for the delete logic to complete
  
  //     toast.dismiss(deleteToastId); // Close the loading toast
  //     toast.success("Project deleted successfully!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   } catch (error) {
  //     toast.dismiss(toastId);
  //     toast.error("Failed to delete project. Please try again.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };
  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this project?");
    
    if (!isConfirmed) return;
  
    try {
      const deleteToastId = toast.loading("Deleting project...", { position: "top-right" });
      
      await handleDeleteProject($id); // Execute the delete logic
  
      toast.dismiss(deleteToastId);
      toast.success("Project deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to delete project. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
 
  
  return (
    <motion.div
      className="bg-white shadow-xl rounded-lg overflow-hidden max-w-sm mx-auto transition-transform transform hover:scale-101"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={appwriteService.getFilePreview(image)}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-6">
        <h2 className="text-xl  h-13 overflow-auto font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-600 mt-2 w-full h-12 overflow-auto "><span className="font-semibold">Description : </span>{description}</p>
        {price && (
          <p className="text-lg font-bold text-green-600 mt-4">
            For Sale: ₹{price}
          </p>
        )}
      </div>
      <div className="flex flex-wrap justify-between p-4 bg-gray-50 rounded-b-lg">
        <button
          onClick={handleEditClick}  // On click, navigate to the edit page
          className="mb-2 px-4 py-2  text-white rounded-lg shadow-md  transition-colors w-full sm:w-auto bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400"
        >
          Edit Project
        </button>
        <button
          onClick={handleDeleteClick}
          className="fixed top-0 left-0 mb-2 px-1.5 py-1.5 text-sm font-bold bg-gradient-to-r from-red-400 to-red-700 hover:bg-gradient-to-r hover:from-red-700 hover:to-red-400 text-white rounded-lg shadow-md hover:bg-red-500 transition-colors sm:w-auto"
        >
          Delete Project
        </button>
        {projectLink && (
          <button
            onClick={() => handleProjectLinkClick(projectLink)}
            className="mb-2 px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-lg shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-400 transition-colors w-full sm:w-auto"
          >
            View Project
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default EditProjectCard;
