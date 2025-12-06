import React, { useState } from 'react';
import { useQuizData } from '../context/QuizDataContext';
import { useAuth } from '../context/AuthContext';

const Quiz = () => {
  const { quizData, loading } = useQuizData();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  const handleAnswer = () => {
    const currentQ = quizData[selectedCategory][currentQuestion];
    
    if (selectedOption === currentQ.answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData[selectedCategory].length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption('');
    } else {
      setShowScore(true);
      // Show user info form after quiz is completed
      if (!user?.name || !user?.email) {
        setShowUserInfo(true);
      } else {
        // Automatically submit if user info is available
        submitQuizResult(user.name, user.email, score);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowUserInfo(false);
    setSelectedOption('');
    setSubmissionMessage('');
  };

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email) return;

    submitQuizResult(userInfo.name, userInfo.email, score);
  };

  const submitQuizResult = async (name, email, quizScore) => {
    setSubmitting(true);
    setSubmissionMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/quiz/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          score: quizScore
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionMessage(`Your score has been saved, ${result.name}!`);
      } else {
        setSubmissionMessage(result.message || 'Error saving your score.');
      }
    } catch (error) {
      setSubmissionMessage('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedCategory) {
    return (
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Choose a Quiz Category</h2>
          <p className="text-muted">Select a category to start testing your knowledge</p>
        </div>
        <div className="row g-4">
          {Object.keys(quizData).map(category => (
            <div key={category} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 category-card fade-in"
                onClick={() => setSelectedCategory(category)}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              >
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3">
                    <i className="fas fa-folder-open fa-2x"></i>
                  </div>
                  <h5 className="card-title">{category}</h5>
                  <p className="card-text">
                    {quizData[category].length} questions
                  </p>
                  <div className="btn btn-outline-primary mt-2">Start Quiz</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showScore) {
    if (showUserInfo) {
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card text-center">
                <div className="card-header bg-success text-white">
                  <h4><i className="fas fa-trophy me-2"></i>Quiz Completed!</h4>
                </div>
                <div className="card-body py-5">
                  <div className="display-4 fw-bold text-success mb-3">{score}/{quizData[selectedCategory].length}</div>
                  <h5 className="card-title">Your Score</h5>
                  <p className="card-text">
                    {score === quizData[selectedCategory].length 
                      ? "Perfect score! You're a genius! 🎉" 
                      : score >= quizData[selectedCategory].length / 2 
                      ? "Great job! Keep learning! 👍" 
                      : "Keep practicing, you'll get better! 💪"
                    }
                  </p>
                  
                  <div className="mt-4">
                    <h5 className="mb-4">Please enter your information to save your score:</h5>
                    <form onSubmit={handleUserInfoSubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-success w-100"
                        disabled={submitting}
                      >
                        {submitting ? 'Saving...' : 'Save Score'}
                      </button>
                    </form>
                    
                    {submissionMessage && (
                      <div className={`mt-3 ${submissionMessage.includes('saved') ? 'text-success' : 'text-danger'}`}>
                        {submissionMessage}
                      </div>
                    )}
                    
                    <button 
                      className="btn btn-outline-secondary mt-3"
                      onClick={restartQuiz}
                    >
                      <i className="fas fa-times me-2"></i>Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card text-center">
                <div className="card-header bg-success text-white">
                  <h4><i className="fas fa-trophy me-2"></i>Quiz Completed!</h4>
                </div>
                <div className="card-body py-5">
                  <div className="display-4 fw-bold text-success mb-3">{score}/{quizData[selectedCategory].length}</div>
                  <h5 className="card-title">Your Score</h5>
                  <p className="card-text">
                    {score === quizData[selectedCategory].length 
                      ? "Perfect score! You're a genius! 🎉" 
                      : score >= quizData[selectedCategory].length / 2 
                      ? "Great job! Keep learning! 👍" 
                      : "Keep practicing, you'll get better! 💪"
                      }
                  </p>
                  {submissionMessage && (
                    <div className={`mt-3 ${submissionMessage.includes('saved') ? 'text-success' : 'text-danger'}`}>
                      {submissionMessage}
                    </div>
                  )}
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <button 
                      className="btn btn-primary"
                      onClick={restartQuiz}
                    >
                      <i className="fas fa-redo me-2"></i>Try Again
                    </button>
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setSelectedCategory('')}
                    >
                      <i className="fas fa-list me-2"></i>Choose Another Category
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  const currentQ = quizData[selectedCategory][currentQuestion];
  const progress = ((currentQuestion + 1) / quizData[selectedCategory].length) * 100;
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card quiz-card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{selectedCategory} Quiz</h4>
                <span className="badge bg-primary">Question {currentQuestion + 1}/{quizData[selectedCategory].length}</span>
              </div>
              <div className="progress mt-3" style={{ height: '8px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title mb-4">{currentQ.question}</h5>
              <div className="list-group options-list">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`list-group-item list-group-item-action option-btn ${selectedOption === option.text ? 'active' : ''}`}
                    onClick={() => setSelectedOption(option.text)}
                  >
                    <span className="option-letter me-3 fw-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option.text}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-primary mt-4 w-100"
                onClick={handleAnswer}
                disabled={!selectedOption}
              >
                {currentQuestion === quizData[selectedCategory].length - 1 
                  ? 'Finish Quiz' 
                  : 'Next Question'
                }
                <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;