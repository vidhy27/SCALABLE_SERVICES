// post-service/server.js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { logger, morganMiddleware } = require('./logger');
const postRoutes = require('./postRoutes'); // Import post routes

const app = express();

// Middleware
app.use(express.json());
app.use(morganMiddleware); // HTTP request logging

// Use the post routes
app.use('/post', postRoutes);  // All routes related to blog posts

// Start server
app.listen(3002, () => {
  logger.info('Post Service running on port 3002');
});

