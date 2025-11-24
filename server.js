import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './src/config/index.js';
import apiRoutes from './src/routes/api.routes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from src/client directory
app.use(express.static(path.join(__dirname, 'src/client')));

// API Routes
app.use(`/api/${config.apiVersion}`, apiRoutes);

// Serve index.html for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'src/client', 'index.html'));
  }
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║         💎 Precious List App           ║
║         Server is running...           ║
╚════════════════════════════════════════╝

📍 Local:         http://localhost:${PORT}
🔗 API:           http://localhost:${PORT}/api/${config.apiVersion}
📊 Health Check:  http://localhost:${PORT}/api/${config.apiVersion}/health
🌍 Environment:   ${config.nodeEnv}

Press Ctrl+C to stop the server
  `);
});

export default app;
