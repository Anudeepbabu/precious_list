import fs from 'fs';
import path from 'path';
import config from '../config/index.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(path.dirname(path.dirname(__dirname)), 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'app.log');
const errorLogFile = path.join(logsDir, 'error.log');

const formatTimestamp = () => new Date().toISOString();

const writeLog = (file, message) => {
  fs.appendFileSync(file, `${message}\n`);
};

export const logger = (req, res, next) => {
  const start = Date.now();
  const originalSend = res.send;

  res.send = function (data) {
    const duration = Date.now() - start;
    const logMessage = `[${formatTimestamp()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`;

    console.log(`📝 ${logMessage}`);
    writeLog(logFile, logMessage);

    return originalSend.call(this, data);
  };

  next();
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';

  const errorLog = `[${formatTimestamp()}] ERROR: ${err.name} - ${errorMessage}\n` +
    `Request: ${req.method} ${req.originalUrl}\n` +
    `Stack: ${err.stack}\n` +
    `---\n`;

  console.error(`❌ ${errorLog}`);
  writeLog(errorLogFile, errorLog);

  res.status(statusCode).json({
    success: false,
    error: {
      message: config.isDevelopment ? errorMessage : 'An error occurred',
      ...(config.isDevelopment && { stack: err.stack })
    }
  });
};

export const notFoundHandler = (req, res) => {
  const message = `Route not found: ${req.method} ${req.originalUrl}`;
  console.warn(`⚠️  ${message}`);
  writeLog(logFile, `[${formatTimestamp()}] WARNING: ${message}`);

  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found'
    }
  });
};
