const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const questionRoutes = require('./routes/questions');
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz');

app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});