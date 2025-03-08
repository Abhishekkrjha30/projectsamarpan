import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import ScrollToTop from "./component/ScrollToTop";
import { HomePage, ChatPage, ProjectSubmission, SignUp, SignIn, IntroPage, Navbar, Footer, ProfilePage, ProjectPage, EditProjectSubmission } from './component/index';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  // const authStatus = useSelector((state) => state.auth.user !== null); // ✅ Check if user exists
  const authStatus = useSelector((state) => state.auth.userData !== null); // ✅ Fix property name

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        if (!authStatus) {
          
          setLoading(false); // ✅ Ensure loading stops even if no user
          return;
        }
        
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        dispatch(logout());
      } finally {
        setLoading(false); // ✅ Ensure loading stops
      }
    };

    checkUserStatus();
  }, [dispatch, authStatus]); // ✅ Add authStatus dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  const isIntroPage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
          <Route path="/edit-project/:projectId" element={<EditProjectSubmission />} />
        </Routes>
      </main>

      {!isIntroPage && <Footer />}
    </div>
  );
}

export default App;
