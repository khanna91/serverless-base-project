const winston = require('winston');
const sanitizer = require('node-sanitizer');

const {
  combine,
  colorize,
  simple
} = winston.format;

const options = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    prettyPrint: true,
    format: combine(
      colorize(),
      simple()
    )
  }
};

const transports = [
  new winston.transports.Console(options.console)
];

// instantiate a new Winston Logger with the settings defined above
const logger = winston.loggers.add(process.env.NODE_ENV, {
  transports
});

// create a stream object with a 'write' function that will be used by `loggerMiddleware`
logger.stream = {
  write: (req) => {
    logger.info(`${req.method} request to ${req.url}`, {
      body: sanitizer(req.body, sanitizedFields),
      query: sanitizer(req.query, sanitizedFields)
    });
  }
};

logger.streamError = {
  write: (req) => {
    logger.error(`${req.method} request to ${req.url}`, {
      body: sanitizer(req.body, sanitizedFields),
      query: sanitizer(req.query, sanitizedFields)
    });
  }
};

module.exports = {
  logger
}