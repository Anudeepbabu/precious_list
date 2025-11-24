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
