import React, { useState } from 'react';
import { useQuizData } from '../context/QuizDataContext';

const Admin = () => {
  const { quizData, addQuestion, loading, refreshData } = useQuizData();
  const [newQuestion, setNewQuestion] = useState({
    category: '',
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'options') {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[index] = value;
      setNewQuestion({ ...newQuestion, options: updatedOptions });
    } else {
      setNewQuestion({ ...newQuestion, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (newQuestion.category && newQuestion.question && 
        newQuestion.options.every(opt => opt.trim() !== '') && 
        newQuestion.answer) {
      
      const result = await addQuestion(newQuestion.category, newQuestion);
      
      if (result.success) {
        setNewQuestion({
          category: '',
          question: '',
          options: ['', '', '', ''],
          answer: ''
        });
        setMessage('Question added successfully!');
      } else {
        setMessage('Error adding question: ' + result.error);
      }
    } else {
      setMessage('Please fill all fields');
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading questions...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
          {message}
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6">
          <h3>Add New Question</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={newQuestion.category}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Question</label>
              <textarea
                className="form-control"
                name="question"
                value={newQuestion.question}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            
            {newQuestion.options.map((option, index) => (
              <div className="mb-3" key={index}>
                <label className="form-label">Option {index + 1}</label>
                <input
                  type="text"
                  className="form-control"
                  name="options"
                  value={option}
                  onChange={(e) => handleInputChange(e, index)}
                  required
                />
              </div>
            ))}
            
            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <input
                type="text"
                className="form-control"
                name="answer"
                value={newQuestion.answer}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Add Question</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={refreshData}>
              Refresh Questions
            </button>
          </form>
        </div>
        
        <div className="col-md-6">
          <h3>Existing Questions</h3>
          {Object.keys(quizData).map(category => (
            <div key={category}>
              <h4>{category}</h4>
              <ul className="list-group">
                {quizData[category].map((q, index) => (
                  <li key={index} className="list-group-item">
                    {q.question}
                    <br />
                    <small className="text-muted">
                      Options: {q.options.map(opt => opt.text).join(', ')}
                    </small>
                    <br />
                    <small className="text-success">Answer: {q.answer}</small>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;


