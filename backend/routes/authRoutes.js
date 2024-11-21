const express = require('express');
const router = express.Router();

// User Registration
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Logic for registering a user
  res.send(`User registered: ${name}`);
});

// User Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Logic for user authentication
  res.send(`User logged in: ${email}`);
});

module.exports = router;
