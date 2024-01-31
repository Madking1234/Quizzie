// App.js
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import Main from "./pages/Main";
import React, { useEffect, useState } from "react";
import { AuthProvider } from "./context/authContext";
import { QuizProvider } from "./context/quizContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking authentication:", error.message);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <div className="App">
      <QuizProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />

            <Route
              path="/Login/main"
              element={
                isAuthenticated ? <Main /> : <Navigate to="/Login" replace />
              }
            />
          </Routes>
        </AuthProvider>
      </QuizProvider>
    </div>
  );
}

export default App;
