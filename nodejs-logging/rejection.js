const winston = require('winston');

async function callAsync() {
  return Promise.reject('ups');
}

callAsync();
const logger = winston.createLogger({
  level: 'silly',
  // handleRejections: true,
  transports: [new winston.transports.File({ handleRejections: true, handleExceptions: true, filename: 'exception.log' })], // tujuan pengiriman log: console/terminal & file + transport level + daily rotate
});
