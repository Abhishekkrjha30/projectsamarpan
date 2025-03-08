/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Menu, X, Bell } from "lucide-react"; // Bell icon added
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice"; // ✅ Correct logout import
import LogoutBtn from "./LogoutBtn"; // ✅ Logout button component
import authService from "../appwrite/auth"; // ✅ Ensure Appwrite auth service is imported

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const authStatus = useSelector((state) => state.auth.status); // ✅ Redux state for authentication
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!authStatus) return;
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserId(user.$id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [authStatus]);

  // ✅ Optimized navigation items based on authentication status
  const navItems = useMemo(
    () => [
      { name: "Home", path: "/home", active: true },
      { name: "Projects", path: "/projectPage", active: true },
      { name: "Profile", path: "/profile", active: authStatus },
      { name: "Chat", path: "/chat", active: authStatus },
      { name: "Sign In", path: "/signin", active: !authStatus },
      { name: "Sign Up", path: "/sign-up", active: !authStatus },
    ],
    [authStatus]
  );

  // ✅ Logout handler - Updates Redux & clears session data
  const handleLogout = async () => {
    try {
      await authService.logout(); // ✅ Logout from Appwrite
        dispatch(logout()); // ✅ Update Redux state immediately

        // ✅ Ensure localStorage is cleared before checking status
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");

        navigate("/"); // ✅ Redirect to homepage
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // ✅ Navigation handler with authentication check
  const handleNavigation = (path) => {
    if (!authStatus && path !== "/home" && path !== "/sign-up" && path !== "/signin") {
      toast.error("You must sign in or sign up to access this page!");
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <Link to="/">ProjectSamarpan</Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
              {navItems.map(
                (item, index) =>
                  item.active && (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className="hover:text-indigo-200 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.button>
                  )
              )}

              {/* Logout Button */}
              {authStatus && (
                <div onClick={handleLogout} className="font-bold hover:text-indigo-200 cursor-pointer">
                  <LogoutBtn />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-indigo-200 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg">
            <div className="px-4 py-2 space-y-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <button
                      key={item.name}
                      onClick={() => {
                        handleNavigation(item.path);
                        setIsOpen(false);
                      }}
                      className="block text-white hover:text-indigo-200 font-medium"
                    >
                      {item.name}
                    </button>
                  )
              )}

              {/* Logout Button in Mobile Menu */}
              {authStatus && (
                <div
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block text-white hover:text-indigo-200 font-medium cursor-pointer"
                >
                  <LogoutBtn />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
