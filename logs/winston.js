var { createLogger, format, transports } = require('winston');
var winston = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

var options = {
    file: {
      level: 'info',
      filename: `./logs/info.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    fileError: {
        level: 'error',
        filename: `./logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      fileDebug: {
        level: 'debug',
        filename: `./logs/debug.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };
  
  // instantiate a new Winston Logger with the settings defined above
  var logger = new winston.createLogger({
    format: combine(
            timestamp(),
            myFormat
          ),
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.File(options.fileError),
      new winston.transports.File(options.fileDebug),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
  });
  
  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };
  
  module.exports = logger;