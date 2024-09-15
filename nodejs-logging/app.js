const winston = require('winston');
require('winston-daily-rotate-file');
const Transport = require('winston-transport');

class MyTransport extends Transport {
  constructor(opts) {
    super(opts);
    //
    // Consume any custom options here. e.g.:
    // - Connection information for databases
    // - Authentication information for APIs (e.g. loggly, papertrail,
    //   logentries, etc.).
    //
  }

  log(info, next) {
    console.log(`${new Date()} : ${info.level.toUpperCase()} : ${info.message}`);
    next();
  }
}

const logger = winston.createLogger({
  // handleExceptions: true,
  level: 'silly', // minimal level yang akan dikirim ke transports
  // format: winston.format.simple(), // formatting: plain text u/ log (by default: json)
  // format: winston.format.logstash(), // formatting: logstash u/ log (by default: json)
  // format: winston.format.printf((log) => {
  //   return `${new Date()} : ${log.level.toUpperCase()} : ${log.message}`;
  // }), // membuat format sendiri
  // format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), winston.format.json()), // formatting: kombinasi beberapa format || ms: jarak waktu antar log
  transports: [
    // new winston.transports.Console({}),
    // new winston.transports.File({ filename: 'application.log' }),
    // new winston.transports.File({ filename: 'app-error.log', level: 'error' }),
    // new winston.transports.DailyRotateFile({
    //   filename: 'application-%DATE%.log',
    //   zippedArchive: true,
    //   maxSize: '1m',
    //   maxFiles: '14d',
    // }),
    new MyTransport({}),
    new winston.transports.File({ handleExceptions: true, filename: 'exception.log' }),
  ], // tujuan pengiriman log: console/terminal & file + transport level + daily rotate
});

// for (let i = 0; i < 100000; i++) {
//   logger.info(`hello world ${i}`);
// }

// cara penulisan 1
logger.log({
  level: 'error',
  message: 'hello error',
});

// cara penulisan 2
logger.log('silly', 'hello silly');
logger.log('debug', 'hello debug');
logger.log('warn', 'hello warn');

// cara penulisan 3
logger.verbose('hello verbose');
logger.info('hello info');
logger.error('hello error');

hello();
