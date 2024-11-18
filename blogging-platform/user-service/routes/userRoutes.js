const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { logger } = require('./logger');

// Initialize the router
const router = express.Router(); 

const pool = new Pool({ connectionString: 'postgres://user:password@localhost:5432/blogdb' });

// User registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, email, hashedPassword];

    const result = await pool.query(query, values);
    const user = result.rows[0];
    logger.info(`User registered: ${user.username}`);  // Log registration
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    logger.error(`Error registering user: ${err.message}`, err);  // Log the error
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    const result = await pool.query(query, values);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret');
      logger.info(`User logged in: ${user.username}`);  // Log login
      res.json({ token });
    } else {
      logger.warn('Invalid credentials attempt');  // Log invalid attempt
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    logger.error(`Error logging in user: ${err.message}`, err);  // Log the error
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

module.exports = router;

