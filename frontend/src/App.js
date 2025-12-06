import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Quiz from "./components/Quiz";
import Admin from "./components/Admin";
import { QuizDataProvider } from "./context/QuizDataContext";
import { AuthProvider } from "./context/AuthContext";
import './App.css';

// Wrapper to use navigate inside App
function AppWrapper() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/quiz");
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QuizDataProvider>
        <Router>
          <AppWrapper />
        </Router>
      </QuizDataProvider>
    </AuthProvider>
  );
}



