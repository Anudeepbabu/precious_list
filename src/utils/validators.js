class ValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ValidationError';
  }
}

export const validators = {
  validatePerson: (person) => {
    if (!person || typeof person !== 'object') {
      throw new ValidationError('Person data must be an object');
    }

    if (!person.name || typeof person.name !== 'string' || person.name.trim() === '') {
      throw new ValidationError('Person name is required and must be a non-empty string');
    }

    if (person.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email)) {
      throw new ValidationError('Invalid email format');
    }

    if (person.phone && !/^[\d\s\-\+\(\)]+$/.test(person.phone)) {
      throw new ValidationError('Invalid phone number format');
    }

    return true;
  },

  validateAsset: (asset) => {
    if (!asset || typeof asset !== 'object') {
      throw new ValidationError('Asset data must be an object');
    }

    if (!asset.name || typeof asset.name !== 'string' || asset.name.trim() === '') {
      throw new ValidationError('Asset name is required and must be a non-empty string');
    }

    if (asset.value && isNaN(parseFloat(asset.value))) {
      throw new ValidationError('Asset value must be a valid number');
    }

    return true;
  },

  validateDocument: (document) => {
    if (!document || typeof document !== 'object') {
      throw new ValidationError('Document data must be an object');
    }

    if (!document.name || typeof document.name !== 'string' || document.name.trim() === '') {
      throw new ValidationError('Document name is required and must be a non-empty string');
    }

    return true;
  },

  validateKnowledgeBase: (item) => {
    if (!item || typeof item !== 'object') {
      throw new ValidationError('Knowledge base item must be an object');
    }

    if (!item.title || typeof item.title !== 'string' || item.title.trim() === '') {
      throw new ValidationError('Knowledge base title is required and must be a non-empty string');
    }

    return true;
  },

  validateArray: (data, validator, itemName) => {
    if (!Array.isArray(data)) {
      throw new ValidationError(`${itemName} must be an array`);
    }

    data.forEach((item, index) => {
      try {
        validator(item);
      } catch (error) {
        throw new ValidationError(`Invalid ${itemName} at index ${index}: ${error.message}`);
      }
    });

    return true;
  }
};

export { ValidationError };
