/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth"; // Import authService

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Set initial state to null
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch user data using authService
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming `authService.getCurrentUser()` is the method to fetch user data
        const response = await authService.getCurrentUser();
        setUserData(response); // Set user data
        setFormData(response); // Sync form data
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(userData); // Reset form data to the current user data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserData(formData); // Update the user data
    setIsEditing(false); // Exit editing mode
    try {
      // Assuming `authService.updateUserProfile()` updates the user profile in the backend
      await authService.updateUserProfile(formData);
      console.log("Updated user data sent to backend:", formData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 max-h-screen pt-6">
      <div className="container mx-auto p-6 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 tracking-wide">
            Profile
          </h1>

          <div className="space-y-6">
            {!isEditing ? (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                  User Information
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong className="text-gray-800">Name:</strong>{" "}
                    {userData.name}
                  </p>
                  <p>
                    <strong className="text-gray-800">Email:</strong>{" "}
                    {userData.email}
                  </p>
                  {/* <p>
                    <strong className="text-gray-800">Phone:</strong>{" "}
                    {userData.phone}
                  </p> */}
                  {/* <p>
                    <strong className="text-gray-800">Address:</strong>{" "}
                    {userData.address}
                  </p> */}
                </div>

                <button
                  onClick={handleEditClick}
                  className="mt-4 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Edit Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                    />
                  </div> */}
                </div>

                <div className="flex justify-center space-x-6 mt-6">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md hover:from-green-600 hover:to-green-700 transition duration-300 transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="py-3 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
