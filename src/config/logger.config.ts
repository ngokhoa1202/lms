import winston from 'winston';
import 'winston-daily-rotate-file';


export const logger = winston.createLogger({
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
    })
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'error.log',
      level: 'error',
      dirname: '../logging/error',
      maxSize: '10m',
      maxFiles: '14d',
      zippedArchive: true,
      datePattern: 'YYYY-MM-DD'
    }),
    new winston.transports.DailyRotateFile({
      filename: 'app.log',
      dirname: '../logging/app',
      maxSize: '10m',
      maxFiles: '14d',
      zippedArchive: true,
      datePattern: 'YYYY-MM-DD'
    })
  ]
});
