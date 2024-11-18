const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configure the database connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // Ensure this matches your local machine setup
  database: 'blogdb',
  password: 'Goodluck#27',
  port: 5432,
});

// POST route to create a new post
router.post('/post', async (req, res) => {
  const { title, content, user_id, author_id } = req.body;

  // Validate request body
  if (!title || !content || !user_id || !author_id) {
    return res.status(400).json({
      message: 'Missing required fields: title, content, user_id, or author_id',
    });
  }

  try {
    const query = `
      INSERT INTO posts (title, content, user_id, author_id, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, NOW(), NOW()) 
      RETURNING *;
    `;
    const values = [title, content, user_id, author_id];

    // Execute the query
    const result = await pool.query(query, values);

    // Send the response
    res.status(201).json({
      message: 'Post created successfully',
      post: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting post:', err);

    // Detailed error response
    res.status(500).json({
      message: 'Error creating post',
      error: err.message,
    });
  }
});

module.exports = router;

