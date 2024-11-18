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

// Create a new post
router.post('/post', async (req, res) => {
  const { title, content, user_id, author_id } = req.body;

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

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Post created successfully',
      post: result.rows[0],
    });
  } catch (err) {
    console.error('Error inserting post:', err);
    res.status(500).json({
      message: 'Error creating post',
      error: err.message,
    });
  }
});

// Edit an existing post
router.put('/post/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: 'Missing required fields: title or content',
    });
  }

  try {
    const query = `
      UPDATE posts 
      SET title = $1, content = $2, updated_at = NOW() 
      WHERE id = $3 
      RETURNING *;
    `;
    const values = [title, content, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      message: 'Post updated successfully',
      post: result.rows[0],
    });
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({
      message: 'Error updating post',
      error: err.message,
    });
  }
});

// Select posts by username
router.get('/posts/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const query = `
      SELECT posts.* 
      FROM posts 
      INNER JOIN users ON posts.user_id = users.id 
      WHERE users.username = $1;
    `;
    const values = [username];

    const result = await pool.query(query, values);

    res.json({
      message: 'Posts retrieved successfully',
      posts: result.rows,
    });
  } catch (err) {
    console.error('Error retrieving posts:', err);
    res.status(500).json({
      message: 'Error retrieving posts',
      error: err.message,
    });
  }
});

// Delete a post
router.delete('/post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      DELETE FROM posts 
      WHERE id = $1 
      RETURNING *;
    `;
    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      message: 'Post deleted successfully',
      post: result.rows[0],
    });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({
      message: 'Error deleting post',
      error: err.message,
    });
  }
});

module.exports = router;

