import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './src/config/index.js';
import apiRoutes from './src/routes/api.routes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// ============================================
// SECURITY MIDDLEWARE
//TEST
// ============================================

// Helmet.js - Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP',
  skip: (req) => config.isDevelopment
});
app.use(limiter);

// HTTPS redirect in production (only when actually running HTTPS with Railway)
if (config.isProduction && process.env.RAILWAY_ENVIRONMENT_NAME) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Standard middleware
app.use(cors(config.cors));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from src/client directory
app.use(express.static(path.join(__dirname, 'src/client')));

// API Routes
app.use(`/api/${config.apiVersion}`, apiRoutes);

// Demo redirect
app.get('/demo', (req, res) => {
  res.redirect('/dashboard');
});

// Dashboard route - serve dashboard.html
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/client', 'dashboard.html'));
});

// Privacy and Terms pages
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/client', 'privacy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/client', 'terms.html'));
});

app.get('/security', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/client', 'security.html'));
});

// Serve index.html for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'src/client', 'index.html'));
  }
});

// Error handling middleware
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================
const PORT = config.port || 3000;
const HTTPS_PORT = config.httpsPort || 443;

let server;

if (config.isProduction) {
  // Try to use HTTPS in production
  const certPath = process.env.SSL_CERT_PATH || '/etc/ssl/certs/server.crt';
  const keyPath = process.env.SSL_KEY_PATH || '/etc/ssl/private/server.key';
  
  try {
    const cert = fs.readFileSync(certPath, 'utf8');
    const key = fs.readFileSync(keyPath, 'utf8');
    server = https.createServer({ cert, key }, app);
    server.listen(HTTPS_PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║    💎 Precious List - SECURE SERVER   ║
║           🔒 HTTPS ENABLED 🔒         ║
╚════════════════════════════════════════╝

📍 Secure:        https://0.0.0.0:${HTTPS_PORT}
🔗 API:           https://0.0.0.0:${HTTPS_PORT}/api/${config.apiVersion}
📊 Health Check:  https://0.0.0.0:${HTTPS_PORT}/api/${config.apiVersion}/health
🌍 Environment:   ${config.nodeEnv}
🔐 Security:      HSTS ✓ CSP ✓ Rate Limiting ✓ Helmet.js ✓

Press Ctrl+C to stop the server
      `);
    });
  } catch (error) {
    // Fall back to HTTP if SSL not available (for Railway)
    console.log('ℹ️  SSL certificates not found - using HTTP\n');
    console.log('   Railway will provide HTTPS at the edge.\n');
    server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║         💎 Precious List App           ║
║        Ready for Railway Deploy        ║
╚════════════════════════════════════════╝

📍 Port:          ${PORT}
🔗 API:           http://localhost:${PORT}/api/${config.apiVersion}
📊 Health Check:  http://localhost:${PORT}/api/${config.apiVersion}/health
🌍 Environment:   ${config.nodeEnv}
🌐 Note:          Railway will handle HTTPS encryption

Press Ctrl+C to stop the server
      `);
    });
  }
} else {
  // HTTP in development
  server = app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║         💎 Precious List App           ║
║         Server is running...           ║
╚════════════════════════════════════════╝

📍 Local:         http://localhost:${PORT}
🔗 API:           http://localhost:${PORT}/api/${config.apiVersion}
📊 Health Check:  http://localhost:${PORT}/api/${config.apiVersion}/health
🌍 Environment:   ${config.nodeEnv}
💬 Note:          Development mode - security headers enabled

Press Ctrl+C to stop the server
    `);
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n📛 SIGTERM signal received: closing server');
  server.close(() => {
    console.log('✅ Server closed gracefully');
    process.exit(0);
  });
});

export default app;
