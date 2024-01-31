import React, { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizInfo, setQuizInfo] = useState({
    quizName: "",
    quizType: "",
  });

  const updateQuizInfo = (name, type) => {
    setQuizInfo({ quizName: name, quizType: type });
  };

  return (
    <QuizContext.Provider value={{ quizInfo, updateQuizInfo }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
