const morgan = require('morgan');
const winston = require('winston');

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Morgan setup (for HTTP request logging)
const morganMiddleware = morgan('combined');  // Or choose a different morgan format if you want

module.exports = { logger, morganMiddleware };

