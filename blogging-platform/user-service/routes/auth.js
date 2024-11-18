const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: 'postgres://user:password@localhost:5432/blogdb' });

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    res.status(201).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret');
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});

