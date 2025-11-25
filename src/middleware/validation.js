import { ValidationError } from '../utils/validators.js';

export const validateRequestBody = (validator, itemName) => {
  return (req, res, next) => {
    try {
      if (!req.body) {
        throw new ValidationError('Request body is required');
      }

      validator(req.body);
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode || 400).json({
          success: false,
          error: {
            message: error.message
          }
        });
      }

      return res.status(400).json({
        success: false,
        error: {
          message: `Invalid ${itemName}: ${error.message}`
        }
      });
    }
  };
};

export const validateArrayBody = (validator, itemName) => {
  return (req, res, next) => {
    try {
      if (!req.body || !Array.isArray(req.body)) {
        throw new ValidationError(`Request body must be an array of ${itemName}`);
      }

      req.body.forEach((item, index) => {
        try {
          validator(item);
        } catch (error) {
          throw new ValidationError(`Invalid ${itemName} at index ${index}: ${error.message}`);
        }
      });

      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(error.statusCode || 400).json({
          success: false,
          error: {
            message: error.message
          }
        });
      }

      return res.status(400).json({
        success: false,
        error: {
          message: error.message
        }
      });
    }
  };
};

// Security: Sanitize string inputs
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/[<>\"']/g, '')
    .trim()
    .substring(0, 10000);
};

// Security: Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Security: Validate phone format
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

// Security: Input validation middleware
export const sanitizeInputs = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      const value = req.body[key];
      
      // Sanitize string inputs
      if (typeof value === 'string') {
        req.body[key] = sanitizeString(value);
      }
      
      // Check max length
      if (typeof value === 'string' && value.length > 10000) {
        return res.status(400).json({ 
          success: false,
          error: { message: 'Input field too long' } 
        });
      }
    }
  }
  next();
};
