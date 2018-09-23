import winston from 'winston';

const LOG_LEVEL = 'debug';

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

logger[LOG_LEVEL](`Logging level set to ${LOG_LEVEL}`);

export default logger;
