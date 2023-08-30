const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logs/error.json",
      level: "error",
    }),
    new winston.transports.Console(),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.json" }),
  ],
});

module.exports = logger;
