import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const QuizDataContext = createContext();

export const QuizDataProvider = ({ children }) => {
  const [quizData, setQuizData] = useState({});
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000/api/questions';

  // Fetch all questions from backend
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const questions = response.data;
      
      // Group questions by category
      const groupedData = {};
      questions.forEach(question => {
        if (!groupedData[question.category]) {
          groupedData[question.category] = [];
        }
        groupedData[question.category].push(question);
      });
      
      setQuizData(groupedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const addQuestion = async (category, questionData) => {
    try {
      // Convert options to the MongoDB format
      const options = questionData.options.map(opt => ({ text: opt }));
      
      const response = await axios.post(API_BASE_URL, {
        category: category,
        question: questionData.question,
        options: options,
        answer: questionData.answer
      });
      
      // Update local state with new question
      setQuizData(prevData => {
        const newData = { ...prevData };
        if (!newData[category]) {
          newData[category] = [];
        }
        newData[category].push(response.data);
        return newData;
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error adding question:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    quizData,
    addQuestion,
    loading,
    refreshData: fetchQuestions
  };

  return (
    <QuizDataContext.Provider value={value}>
      {children}
    </QuizDataContext.Provider>
  );
};

export const useQuizData = () => {
  const context = useContext(QuizDataContext);
  if (!context) {
    throw new Error('useQuizData must be used within a QuizDataProvider');
  }
  return context;
};