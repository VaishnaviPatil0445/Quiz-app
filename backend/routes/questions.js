const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get questions by category
router.get('/category/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  const question = new Question({
    category: req.body.category,
    question: req.body.question,
    options: req.body.options,
    answer: req.body.answer
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a question
router.patch('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (req.body.category != null) {
      question.category = req.body.category;
    }
    if (req.body.question != null) {
      question.question = req.body.question;
    }
    if (req.body.options != null) {
      question.options = req.body.options;
    }
    if (req.body.answer != null) {
      question.answer = req.body.answer;
    }
    
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


