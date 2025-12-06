import React, { createContext, useState } from "react";
import data from "../data";   // Import categories

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [category, setCategory] = useState(""); // chosen category
  const [quizs, setQuizs] = useState([]);
  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState(0);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // pick category and start quiz
  const startQuiz = (selectedCategory) => {
    setCategory(selectedCategory);
    setQuizs(data[selectedCategory]);  // load only that category's questions
    setShowStart(false);
    setShowQuiz(true);
  };

  const nextQuestion = () => {
    if (index + 1 < quizs.length) {
      setIndex(index + 1);
    } else {
      setShowQuiz(false);
      setShowResult(true);
    }
  };

  const checkAnswer = (ans) => {
    if (ans === quizs[index].ans) {
      setMarks(marks + 5);
    }
    nextQuestion();
  };

  const startOver = () => {
    setShowStart(true);
    setShowQuiz(false);
    setShowResult(false);
    setMarks(0);
    setIndex(0);
    setCategory("");
  };

  return (
    <DataContext.Provider
      value={{
        category,
        quizs,
        index,
        marks,
        showStart,
        showQuiz,
        showResult,
        startQuiz,
        checkAnswer,
        startOver,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
