const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Submit quiz results and update/create user with score
router.post('/submit-quiz', async (req, res) => {
  try {
    const { name, email, score } = req.body;

    if (!name || !email || score === undefined) {
      return res.status(400).json({ message: 'Name, email, and score are required' });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email });

    if (user) {
      // Update existing user's score
      user.name = name;
      user.score = Math.max(user.score, score); // Keep the highest score
      user = await user.save();
    } else {
      // Create new user
      user = new User({
        name,
        email,
        score
      });
      user = await user.save();
    }

    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;