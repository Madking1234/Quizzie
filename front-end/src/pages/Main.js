import React, { useState, useEffect } from "react";
import styles from "../styles/Pages/Main.module.css";
import logo from "../components/Assets/QUIZZIE.png";
import line from "../components/Assets/line.png";
import { useAuth } from "../context/authContext";
import DashBoard from "../components/DashBoard/Dashboard";
import Quiz from "../components/DashBoard/Quiz";
import Analytics from "../components/DashBoard/Analytics";
import CreateQuiz from "../components/DashBoard/createQuiz";
function Main() {
  const [selectedButton, setSelectedButton] = useState("Dashboard");
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/Login";
  };
  useEffect(() => {
    setSelectedButton("dashboard");
  }, []);
  const openQuiz = () => {
    setShowQuiz(true);
  };
  const closeQuiz = () => {
    setShowQuiz(false);
  };
  const openCreateQuiz = () => {
    setShowCreateQuiz(true);
  };

  const closeCreateQuiz = () => {
    setShowCreateQuiz(false);
  };
  return (
    <div className={styles.mainBody}>
      <div className={styles.sideBar}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.appFunctionalities}>
          <button
            className={`${styles.buttons} ${
              selectedButton === "dashboard" && styles.selected
            }`}
            onClick={() => setSelectedButton("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`${styles.buttons} ${
              selectedButton === "analytics" && styles.selected
            }`}
            onClick={() => setSelectedButton("analytics")}
          >
            Analytics
          </button>
          <button
            className={`${styles.buttons} ${
              selectedButton === "quiz" && styles.selected
            }`}
            onClick={openQuiz}
          >
            Create Quiz
          </button>
        </div>

        <div className={styles.logOutButton}>
          <img
            className={styles.line}
            src={line}
            alt="line"
            height={2}
            width={180}
          />
          <button className={styles.logOut} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
      <div className={styles.dashBoard}>
        {selectedButton === "dashboard" && <DashBoard />}
        {selectedButton === "analytics" && <Analytics />}
        {showQuiz && !showCreateQuiz && (
          <Quiz onClose={closeQuiz} showCreateQuiz={openCreateQuiz} />
        )}
        {showCreateQuiz && <CreateQuiz closeQuiz={closeCreateQuiz} />}
      </div>
    </div>
  );
}

export default Main;
