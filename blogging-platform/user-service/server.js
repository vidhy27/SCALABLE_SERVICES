require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { morganMiddleware, logger } = require('./logger');
const userRoutes = require('./userRoutes'); // Import user routes

const app = express();
app.use(express.json());
app.use(morganMiddleware);  // Log requests

// Use the user routes for handling '/register' and '/login'
app.use('/user', userRoutes);  // Now all user routes are prefixed with /user

// Start server
app.listen(3001, () => {
  logger.info('User Service running on port 3001');
});

