const express = require('express');
const router = express.Router();
const client = require('./db');  // Import client from db.js

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, author_id } = req.body;
  
  try {
    const result = await client.query(
      'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, author_id]
    );
    res.status(201).json({ message: 'Post created successfully', post: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// Other routes (GET, PUT, DELETE) can follow the same pattern

