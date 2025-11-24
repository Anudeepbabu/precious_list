import googleSheetsService from './src/services/GoogleSheetsService.js';

async function clearAssets() {
  try {
    await googleSheetsService.initialize();
    console.log('Clearing Assets sheet...');
    await googleSheetsService.clearValues('Assets!A2:Z1000');
    console.log('✅ Assets sheet cleared');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

clearAssets();
