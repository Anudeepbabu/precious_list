import express from 'express';
import {
  healthCheck,
  getAuthToken,
  getAllData,
  getPeople,
  savePeople,
  getAssets,
  saveAssets,
  getDocuments,
  saveDocuments,
  getKnowledgeBase,
  saveKnowledgeBase,
  saveBetaSignup
} from '../controllers/DataController.js';
import { validateArrayBody, sanitizeInputs } from '../middleware/validation.js';
import { validators } from '../utils/validators.js';

const router = express.Router();

// Apply input sanitization to all routes
router.use(sanitizeInputs);

// Health check
router.get('/health', healthCheck);

// Authentication
router.get('/auth/token', getAuthToken);

// Data endpoints
router.get('/data', getAllData);

// People endpoints
router.get('/people', getPeople);
router.post('/people', validateArrayBody(validators.validatePerson, 'person'), savePeople);

// Assets endpoints
router.get('/assets', getAssets);
router.post('/assets', validateArrayBody(validators.validateAsset, 'asset'), saveAssets);

// Documents endpoints
router.get('/documents', getDocuments);
router.post('/documents', validateArrayBody(validators.validateDocument, 'document'), saveDocuments);

// Knowledge Base endpoints
router.get('/knowledge-base', getKnowledgeBase);
router.post('/knowledge-base', validateArrayBody(validators.validateKnowledgeBase, 'knowledge base item'), saveKnowledgeBase);

// Beta Signup endpoint
router.post('/beta-signup', saveBetaSignup);

export default router;
