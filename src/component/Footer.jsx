/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";


const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if user is logged in

  // Fetch user data using authService
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming `authService.getCurrentUser()` is the method to fetch user data
        const response = await authService.getCurrentUser();
        if (response) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } 
    };

    fetchUserData();
  }, [isLoggedIn]);


  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-8  md:text-[1.3vw] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-3">About Us</h2>
            <p className="text-sm md:text-[1.1vw]">
              Welcome to ProjectSamarpan! We aim to provide top-notch solutions to our users. Your satisfaction is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="hover:text-indigo-200">
                  Home
                </Link>
              </li>
              {isLoggedIn?<li>
                <Link to="/projectPage" className="hover:text-indigo-200">
                  Projects
                </Link>
              </li>: null}
              
              {isLoggedIn?<li>
                <Link to="/profile" className="hover:text-indigo-200">
                  Profile
                </Link>
              </li>:null}
              {isLoggedIn?<li>
                <Link to="/chat" className="hover:text-indigo-200">
                  Chat
                </Link>
              </li>:null}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-bold mb-3">Contact</h2>
            <p className="text-sm md:text-[1.2vw]">
              Email: <a href="mailto:support@myapp.com" className="hover:text-indigo-200">support@ProjectSamarpan.com</a>
            </p>
            <p className="text-sm">Phone: +1 234 567 890</p>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-7 "
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 5.72a8.58 8.58 0 0 1-2.57.74 4.43 4.43 0 0 0 1.94-2.44 8.88 8.88 0 0 1-2.8 1.07A4.38 4.38 0 0 0 11.41 9a12.44 12.44 0 0 1-9-4.53 4.37 4.37 0 0 0 1.36 5.85 4.44 4.44 0 0 1-2-.55v.06a4.38 4.38 0 0 0 3.5 4.29 4.41 4.41 0 0 1-2 .08 4.38 4.38 0 0 0 4.1 3.05 8.78 8.78 0 0 1-5.45 1.88 8.81 8.81 0 0 1-1.05-.06 12.36 12.36 0 0 0 6.72 2" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.48 3h-15a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5v-15a1.5 1.5 0 0 0-1.5-1.5zm-9 14.45v-5.9h2.4v5.9zm1.2-6.82a1.39 1.39 0 1 1 0-2.78 1.39 1.39 0 0 1 0 2.78zm6.92 6.82h-2.39v-2.95c0-.76-.27-1.27-1.02-1.27-.56 0-.89.38-1.04.76-.05.13-.06.31-.06.49v2.97h-2.4s.03-4.86 0-5.9h2.4v.84a2.37 2.37 0 0 1 2.13-1.18c1.56 0 2.73 1.03 2.73 3.24zm0 0" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-white/10 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ProjectSamarpan by Abhishek. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
