const { Client } = require('pg');

// Use the environment variable or fallback to a hardcoded value (for local testing)
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:Goodluck#27@localhost:5432/blogdb', 
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client; // Export the client to use in routes

