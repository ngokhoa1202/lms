import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';


const Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      const timeStr = timestamp as string;
      const msgStr = message as string;
      const stackStr = stack as string;
      return stack
        ? `${timeStr} [${level.toUpperCase()}]: ${msgStr} \nStack: ${stackStr}`
        : `${timeStr} [${level.toUpperCase()}]: ${msgStr}`;
    }),
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true })
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'app.log',
      dirname: path.resolve(process.cwd(), 'logging', 'app'),
      maxSize: '10m',
      maxFiles: '14d',
      zippedArchive: false,
      datePattern: 'YYYY-MM-DD'
    })
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: 'exceptions.log',
      dirname: path.resolve(process.cwd(), 'logging', 'exceptions'),
      maxSize: '10m',
      maxFiles: '30d',
      zippedArchive: false,
      datePattern: 'YYYY-MM-DD',
      handleExceptions: true
    })
  ],
  rejectionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: 'rejections.log',
      dirname: path.resolve(process.cwd(), 'logging', 'rejections'),
      maxSize: '10m',
      maxFiles: '30d',
      zippedArchive: false,
      datePattern: 'YYYY-MM-DD',
      handleRejections: true
    })
  ]
});

export default Logger;
