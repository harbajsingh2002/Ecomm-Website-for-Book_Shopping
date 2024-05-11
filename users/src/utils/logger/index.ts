// eslint-disable-next-line @typescript-eslint/no-var-requires
const namespace = require('continuation-local-storage').getNamespace('logger');
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import appRoot from 'app-root-path';
import { nanoid } from 'nanoid';
const logsPath = `${appRoot}/lib/logger/logs/`;

const fileFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf((info: any) => {
    try {
      const logId = namespace && namespace.get('logId') ? namespace.get('logId') : nanoid();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      const logMessage = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      return logMessage;
    } catch (error) {
      console.error('Error @ fileFormat @ logger ', error);
      return ''; // Return an empty string or handle the error appropriately
    }
  }),
);

const info = createLogger({
  level: 'info',
  format: fileFormat,
  transports: [
    new DailyRotateFile({
      level: 'info',
      filename: `${logsPath}/info-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxSize: 5242880, // 5MB
      // colorize: false,
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const error = createLogger({
  level: 'error',
  format: fileFormat,
  transports: [
    new DailyRotateFile({
      level: 'error',
      filename: `${logsPath}/error-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxSize: 5242880, // 5MB
      // colorize: false,
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info: any) => {
    let log = '';
    try {
      const logId = namespace && namespace.get('logId') ? namespace.get('logId') : nanoid(); // Use nanoid for generating unique IDs
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      return log || ''; // Ensure returning a string or an empty string
    } catch (error) {
      console.log('Error @ fileFormat @ logger ', error);
      return ''; // Return an empty string or handle the error appropriately
    }
  }),
);

if (process.env.NODE_ENV !== 'production') {
  info.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
  error.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
}

const logger = {
  info: async (msg: any, ...args: any) => {
    info.info(msg, ...args);
  },
  error: async (msg: any, ...args: any) => {
    error.error(msg, ...args);
  },
};
export default logger;
