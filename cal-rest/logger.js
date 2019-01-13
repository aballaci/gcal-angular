/**
 * Configurations of logger.
 */
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

const consoleConfig = [
  new winston.transports.Console({
    'colorize': true
  })
];

const os = require('os');

const isLinux = os.platform() === 'linux';

const fileLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: (isLinux ? '/var/log/node/cal-access.log' : './logs/cal-access.log'),
      level: 'error' }),
    //new winston.transports.File({ filename: 'combined.log' })
    new winston.transports.Console({'colorize': true })
  ]
});



module.exports.logger = fileLogger;
