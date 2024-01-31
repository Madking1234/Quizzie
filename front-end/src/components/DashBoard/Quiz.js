import React, { useState } from "react";
import styles from "../../styles/Dashboard/Quiz.module.css";

import { useQuizContext } from "../../context/quizContext";
const Quiz = ({ onClose, showCreateQuiz }) => {
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { updateQuizInfo } = useQuizContext();
  const handleCancil = (e) => {
    e.stopPropagation();
    onClose();
  };
  const handleQuizType = (type) => {
    setQuizType(type);
    setSelectedType(type);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    updateQuizInfo(quizName, quizType);

    onClose();
    showCreateQuiz();
  };

  return (
    <div className={styles.quizBody}>
      <div className={styles.createQuiz}>
        <div className={styles.quizPopUp}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.quizNameInput}
              value={quizName}
              type="text"
              aria-label="quiz"
              placeholder="Quiz Name"
              onChange={(e) => setQuizName(e.target.value)}
            ></input>
            <div className={styles.quizType}>
              <div>
                <label className={styles.label}>Quiz Type</label>
              </div>
              <div className={styles.quizSelectorButtons}>
                <button
                  type="button"
                  style={{
                    background:
                      selectedType === "poll"
                        ? "rgba(96, 184, 75, 1)"
                        : "white",
                    color:
                      selectedType === "poll"
                        ? "white"
                        : "rgba(159, 159, 159, 1)",
                  }}
                  onClick={() => handleQuizType("poll")}
                >
                  poll
                </button>
                <button
                  type="button"
                  style={{
                    background:
                      selectedType === "q&a" ? "rgba(96, 184, 75, 1)" : "white",
                    color:
                      selectedType === "q&a"
                        ? "white"
                        : "rgba(159, 159, 159, 1)",
                  }}
                  onClick={() => handleQuizType("q&a")}
                >
                  q&a
                </button>
              </div>
            </div>
            <div className={styles.submitCancilButton}>
              <button
                className={styles.cancilButton}
                type="button"
                onClick={handleCancil}
              >
                Cancil
              </button>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
