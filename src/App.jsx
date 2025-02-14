import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import ScrollToTop from "./component/ScrollToTop";

import { HomePage, ChatPage, ProjectSubmission, SignUp, SignIn, IntroPage, Navbar, Footer, ProfilePage, ProjectPage, EditProjectSubmission } from './component/index';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
  }, [dispatch]);

  // If loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading component/spinner
  }

  // Check if we are on the intro page ("/")
  const isIntroPage = location.pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col bg-white`}>
      {/* Conditionally render Navbar (only if not on IntroPage) */}
      {!isIntroPage && <Navbar />}

      <main className={`flex-grow pt-14${isIntroPage ? 'h-full' : ''}`}>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project-submission" element={<ProjectSubmission />} />
          <Route path="/projectPage" element={<ProjectPage />} />
          <Route path="/chat" element={<ChatPage />} />
          {/* Add this route for EditProjectSubmission */}
          <Route path="/edit-project/:projectId" element={<EditProjectSubmission />} />
        </Routes>
      </main>

      {/* Conditionally render Footer (only if not on IntroPage) */}
      {!isIntroPage && <Footer />}
    </div>
  );
}

export default App;
