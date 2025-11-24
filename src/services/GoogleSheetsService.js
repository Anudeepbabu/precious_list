import { google } from 'googleapis';
import fs from 'fs';
import config from '../config/index.js';

class GoogleSheetsService {
  constructor() {
    this.sheetsService = null;
    this.spreadsheetId = config.spreadsheetId;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      if (this.isInitialized && this.sheetsService) {
        return this.sheetsService;
      }

      const serviceAccountKey = JSON.parse(
        fs.readFileSync(config.serviceAccountKeyPath, 'utf8')
      );

      const auth = new google.auth.GoogleAuth({
        credentials: serviceAccountKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.sheetsService = google.sheets({ version: 'v4', auth });
      this.isInitialized = true;

      console.log('✅ Google Sheets API initialized successfully');
      return this.sheetsService;
    } catch (error) {
      console.error('❌ Failed to initialize Google Sheets:', error.message);
      throw new Error(`Google Sheets initialization failed: ${error.message}`);
    }
  }

  setSpreadsheetId(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
  }

  async getValues(range) {
    try {
      if (!this.sheetsService) {
        await this.initialize();
      }

      const response = await this.sheetsService.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range
      });

      return response.data.values || [];
    } catch (error) {
      console.error(`❌ Error reading from ${range}:`, error.message);
      throw new Error(`Failed to read from Google Sheets (${range}): ${error.message}`);
    }
  }

  async appendValues(range, values) {
    try {
      if (!this.sheetsService) {
        await this.initialize();
      }

      const response = await this.sheetsService.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values }
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Error appending to ${range}:`, error.message);
      throw new Error(`Failed to append to Google Sheets (${range}): ${error.message}`);
    }
  }

  async updateValues(range, values) {
    try {
      if (!this.sheetsService) {
        await this.initialize();
      }

      const response = await this.sheetsService.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values }
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Error updating ${range}:`, error.message);
      throw new Error(`Failed to update Google Sheets (${range}): ${error.message}`);
    }
  }

  async clearValues(range) {
    try {
      if (!this.sheetsService) {
        await this.initialize();
      }

      const response = await this.sheetsService.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Error clearing ${range}:`, error.message);
      throw new Error(`Failed to clear Google Sheets (${range}): ${error.message}`);
    }
  }

  async batchClear(ranges) {
    try {
      if (!this.sheetsService) {
        await this.initialize();
      }

      const response = await this.sheetsService.spreadsheets.batchClear({
        spreadsheetId: this.spreadsheetId,
        resource: { ranges }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error batch clearing:', error.message);
      throw new Error(`Failed to batch clear Google Sheets: ${error.message}`);
    }
  }

  async batchUpdate(requests) {
    try {
      if (!this.sheetsService) {
        await this.initialize();
      }

      const response = await this.sheetsService.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        resource: { requests }
      });

      return response.data;
    } catch (error) {
      console.error('❌ Error batch updating:', error.message);
      throw new Error(`Failed to batch update Google Sheets: ${error.message}`);
    }
  }

  async saveData(sheetRange, headers, data, spreadsheetId = null) {
    try {
      const originalSpreadsheetId = this.spreadsheetId;
      if (spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
      }

      // Clear existing data (except headers)
      await this.clearValues(`${sheetRange}!A2:Z1000`);

      // Convert objects to rows
      const rows = data.map(obj =>
        headers.map(header => obj[header] || '')
      );

      // Append new data
      if (rows.length > 0) {
        await this.appendValues(`${sheetRange}!A2:Z1000`, rows);
      }

      this.spreadsheetId = originalSpreadsheetId;
      return { success: true, rowsAdded: rows.length };
    } catch (error) {
      this.spreadsheetId = originalSpreadsheetId;
      console.error(`❌ Error saving data to ${sheetRange}:`, error.message);
      throw new Error(`Failed to save data to Google Sheets: ${error.message}`);
    }
  }

  async loadData(sheetRange, headers, spreadsheetId = null) {
    try {
      const originalSpreadsheetId = this.spreadsheetId;
      if (spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
      }

      const rows = await this.getValues(`${sheetRange}!A:Z`);

      if (!rows || rows.length === 0) {
        this.spreadsheetId = originalSpreadsheetId;
        return [];
      }

      // Skip header row and convert to objects
      const data = rows.slice(1).map(row =>
        headers.reduce((obj, header, index) => {
          obj[header] = row[index] || '';
          return obj;
        }, {})
      );

      this.spreadsheetId = originalSpreadsheetId;
      return data;
    } catch (error) {
      this.spreadsheetId = originalSpreadsheetId;
      console.error(`❌ Error loading data from ${sheetRange}:`, error.message);
      throw new Error(`Failed to load data from Google Sheets: ${error.message}`);
    }
  }

  async appendDataToSheet(sheetRange, headers, data, spreadsheetId = null) {
    try {
      const originalSpreadsheetId = this.spreadsheetId;
      if (spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
      }

      // Convert objects to rows
      const rows = data.map(obj =>
        headers.map(header => obj[header] || '')
      );

      // Append new data without clearing
      let response;
      if (rows.length > 0) {
        response = await this.appendValues(`${sheetRange}!A:Z`, rows);
      }

      this.spreadsheetId = originalSpreadsheetId;
      return { success: true, rowsAdded: rows.length, response };
    } catch (error) {
      this.spreadsheetId = originalSpreadsheetId;
      console.error(`❌ Error appending data to ${sheetRange}:`, error.message);
      throw new Error(`Failed to append data to Google Sheets: ${error.message}`);
    }
  }
}

export default new GoogleSheetsService();
