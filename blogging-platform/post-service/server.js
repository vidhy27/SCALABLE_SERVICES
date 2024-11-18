// server.js
const express = require('express');
const app = express();
const router = require('./routes');  // Import the routes from routes.js

app.use(express.json()); // Make sure to use body-parser middleware if you are sending JSON data

// Use the router as middleware, prefixing the routes with "/api"
app.use('/api', router);

app.listen(3002, () => {
  console.log('Server running on port 3002');
});

