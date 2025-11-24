import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper function to handle SERVICE_ACCOUNT_KEY from environment
function getServiceAccountKeyPath(keyEnv) {
  try {
    // If it's a valid JSON string, write it to a temp file
    const keyObj = JSON.parse(keyEnv);
    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, 'service-account-key.json');
    fs.writeFileSync(tempPath, JSON.stringify(keyObj));
    return tempPath;
  } catch (e) {
    // If not JSON, assume it's a file path
    return keyEnv;
  }
}

export const config = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // Google Sheets
  spreadsheetId: process.env.SPREADSHEET_ID,
  betaSignupSpreadsheetId: process.env.BETA_SIGNUP_SPREADSHEET_ID,
  serviceAccountKeyPath: process.env.SERVICE_ACCOUNT_KEY 
    ? getServiceAccountKeyPath(process.env.SERVICE_ACCOUNT_KEY)
    : path.join(path.dirname(path.dirname(__dirname)), 'precious-list-479016-66451761f825.json'),

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  logDir: process.env.LOG_DIR || './logs',

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100 // limit each IP to 100 requests per windowMs
  },

  // API
  apiVersion: 'v1',
  apiPrefix: '/api/v1'
};

// Validation
const requiredEnvVars = ['SPREADSHEET_ID'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

export default config;
