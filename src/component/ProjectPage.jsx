import { useState, useEffect } from "react";
import { Query } from "appwrite";

import authService from "../appwrite/auth"; // For authentication
import projectSubmissionService from "../appwrite/config"; // Service to fetch projects
import EditProjectCard from "./EditProjectCard"; // Import EditProjectCard component

const UserProjects = () => {
  const [user, setUser] = useState(null); // Store current user
  const [projects, setProjects] = useState([]); // Store projects list
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the currently logged-in user
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);

        // Fetch projects submitted by the user
        const userProjects = await projectSubmissionService.getAllProjects([
          Query.equal("userId", currentUser.$id),
        ]);
        // Reverse the order to show latest projects first
        
        const reversedProjects = userProjects ? [...userProjects].reverse() : [];        
  
        setProjects(reversedProjects); // Set fetched projects in reverse order
      } catch (error) {
        console.error("Error fetching user or projects:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, []);

  // Handle interactions for deleting a project
  const handleDeleteProject = async (projectId) => {
    try {
      await projectSubmissionService.deleteProject(projectId);
      // Remove the deleted project from the state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.$id !== projectId)
      );
      
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle code click action
    const handleProjectLinkClick = (projectLink) => {
     
        window.open(projectLink, "_blank"); // Open the video in a new tab
    };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome, {user.name}!
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Your Projects:
        </h2>

        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={project.id || index}
              className="p-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/4 inline-block"
            >
              <EditProjectCard
                {...project}
                handleDeleteProject={handleDeleteProject}
                handleProjectLinkClick={handleProjectLinkClick}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
