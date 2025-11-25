import googleSheetsService from './GoogleSheetsService.js';
import config from '../config/index.js';

const SHEET_CONFIG = {
  people: {
    name: 'People',
    headers: ['id', 'name', 'relationship', 'email', 'phone', 'country', 'notes']
  },
  assets: {
    name: 'Assets',
    headers: ['id', 'name', 'category', 'type', 'country', 'description', 'accessDetails', 'inheritor', 'executor', 'recipient']
  },
  documents: {
    name: 'Documents',
    headers: ['id', 'name', 'sharedWith', 'accessLevel', 'lastModified']
  },
  knowledgeBase: {
    name: 'Knowledge Base',
    headers: ['id', 'title', 'category', 'content', 'url', 'notes']
  },
  betaSignups: {
    name: 'Signups',
    headers: ['email', 'timestamp', 'date']
  }
};

class DataService {
  async getAllData() {
    try {
      const data = {};

      // Load only dashboard data (not beta signups which is in a different spreadsheet)
      const dashboardSheets = ['people', 'assets', 'documents', 'knowledgeBase'];
      for (const key of dashboardSheets) {
        const config = SHEET_CONFIG[key];
        data[key] = await googleSheetsService.loadData(config.name, config.headers);
      }

      return data;
    } catch (error) {
      console.error('❌ Error loading all data:', error.message);
      throw new Error(`Failed to load data: ${error.message}`);
    }
  }

  async getPeople() {
    try {
      const config = SHEET_CONFIG.people;
      return await googleSheetsService.loadData(config.name, config.headers);
    } catch (error) {
      console.error('❌ Error loading people:', error.message);
      throw new Error(`Failed to load people: ${error.message}`);
    }
  }

  async getAssets() {
    try {
      const config = SHEET_CONFIG.assets;
      return await googleSheetsService.loadData(config.name, config.headers);
    } catch (error) {
      console.error('❌ Error loading assets:', error.message);
      throw new Error(`Failed to load assets: ${error.message}`);
    }
  }

  async getDocuments() {
    try {
      const config = SHEET_CONFIG.documents;
      return await googleSheetsService.loadData(config.name, config.headers);
    } catch (error) {
      console.error('❌ Error loading documents:', error.message);
      throw new Error(`Failed to load documents: ${error.message}`);
    }
  }

  async getKnowledgeBase() {
    try {
      const config = SHEET_CONFIG.knowledgeBase;
      return await googleSheetsService.loadData(config.name, config.headers);
    } catch (error) {
      console.error('❌ Error loading knowledge base:', error.message);
      throw new Error(`Failed to load knowledge base: ${error.message}`);
    }
  }

  async savePeople(people) {
    try {
      const config = SHEET_CONFIG.people;
      // Check if this is an array with multiple items (seed operation) or single/few items (user add)
      if (Array.isArray(people) && people.length > 3) {
        // Seed operation - clear and replace all data
        return await googleSheetsService.saveData(config.name, config.headers, people);
      } else {
        // User form submission - append without clearing
        return await googleSheetsService.appendDataToSheet(config.name, config.headers, people);
      }
    } catch (error) {
      console.error('❌ Error saving people:', error.message);
      throw new Error(`Failed to save people: ${error.message}`);
    }
  }

  async saveAssets(assets) {
    try {
      const config = SHEET_CONFIG.assets;
      // Check if this is an array with multiple items (seed operation) or single/few items (user add)
      if (Array.isArray(assets) && assets.length > 3) {
        // Seed operation - clear and replace all data
        return await googleSheetsService.saveData(config.name, config.headers, assets);
      } else {
        // User form submission - append without clearing
        return await googleSheetsService.appendDataToSheet(config.name, config.headers, assets);
      }
    } catch (error) {
      console.error('❌ Error saving assets:', error.message);
      throw new Error(`Failed to save assets: ${error.message}`);
    }
  }

  async saveDocuments(documents) {
    try {
      const config = SHEET_CONFIG.documents;
      // Check if this is an array with multiple items (seed operation) or single/few items (user add)
      if (Array.isArray(documents) && documents.length > 3) {
        // Seed operation - clear and replace all data
        return await googleSheetsService.saveData(config.name, config.headers, documents);
      } else {
        // User form submission - append without clearing
        return await googleSheetsService.appendDataToSheet(config.name, config.headers, documents);
      }
    } catch (error) {
      console.error('❌ Error saving documents:', error.message);
      throw new Error(`Failed to save documents: ${error.message}`);
    }
  }

  async saveKnowledgeBase(items) {
    try {
      const config = SHEET_CONFIG.knowledgeBase;
      // Check if this is an array with multiple items (seed operation) or single/few items (user add)
      if (Array.isArray(items) && items.length > 3) {
        // Seed operation - clear and replace all data
        return await googleSheetsService.saveData(config.name, config.headers, items);
      } else {
        // User form submission - append without clearing
        return await googleSheetsService.appendDataToSheet(config.name, config.headers, items);
      }
    } catch (error) {
      console.error('❌ Error saving knowledge base:', error.message);
      throw new Error(`Failed to save knowledge base: ${error.message}`);
    }
  }

  async saveBetaSignup(email) {
    try {
      const sheetConfig = SHEET_CONFIG.betaSignups;
      const timestamp = new Date().toISOString();
      const date = new Date().toLocaleDateString();

      const signupData = [{
        email,
        timestamp,
        date
      }];

      // Use appendDataToSheet to add to beta signup spreadsheet without clearing
      return await googleSheetsService.appendDataToSheet(
        sheetConfig.name,
        sheetConfig.headers,
        signupData,
        config.betaSignupSpreadsheetId
      );
    } catch (error) {
      console.error('❌ Error saving beta signup:', error.message);
      throw new Error(`Failed to save beta signup: ${error.message}`);
    }
  }
}

export default new DataService();
