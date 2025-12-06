const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [OptionSchema],
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', QuestionSchema);


