// logger.js


const winston = require('winston');

const { v4: uuidv4 } = require('uuid');
let asyncLocalStorage;
try {
  asyncLocalStorage = require('./requestContext');
} catch (e) {
  asyncLocalStorage = null;
}

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'grey'
});



const addRequestId = winston.format((info) => {
  let requestId;
  if (asyncLocalStorage) {
    const store = asyncLocalStorage.getStore();
    requestId = store && store.requestId;
  }
  info.uuid = requestId || uuidv4();
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    addRequestId(),
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, uuid }) => `${timestamp} [${level}] [${uuid}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console()
  ],
});

module.exports = logger;
