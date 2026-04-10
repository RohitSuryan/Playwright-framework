import winston from 'winston';
import path from 'path';
import fs from 'fs';

/**
 * Logger utility class using Winston
 * Provides structured logging with different levels
 */
export class Logger {
  private logger: winston.Logger;
  private context: string;

  constructor(context: string = 'Test') {
    this.context = context;

    // Create logs directory if it doesn't exist
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { context: this.context },
      transports: [
        // Write all logs to console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context }) => {
              return `${timestamp} [${context}] ${level}: ${message}`;
            })
          ),
        }),
        // Write all logs to file
        new winston.transports.File({
          filename: path.join(logsDir, 'test-execution.log'),
          format: winston.format.combine(winston.format.uncolorize(), winston.format.json()),
        }),
        // Write error logs to separate file
        new winston.transports.File({
          filename: path.join(logsDir, 'errors.log'),
          level: 'error',
          format: winston.format.combine(winston.format.uncolorize(), winston.format.json()),
        }),
      ],
    });
  }

  /**
   * Log info level message
   */
  info(message: string, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  /**
   * Log error level message
   */
  error(message: string, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  /**
   * Log debug level message
   */
  debug(message: string, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  /**
   * Log warning level message
   */
  warn(message: string, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  /**
   * Log with custom level
   */
  log(level: string, message: string, ...args: any[]): void {
    this.logger.log(level, message, ...args);
  }
}
