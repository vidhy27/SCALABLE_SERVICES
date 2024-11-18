// post-service/logger.js
const morgan = require('morgan');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
  ],
});

const morganMiddleware = morgan('combined');

module.exports = { logger, morganMiddleware };

