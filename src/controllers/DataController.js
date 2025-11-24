import dataService from '../services/DataService.js';

export const healthCheck = async (req, res, next) => {
  try {
    res.json({
      success: true,
      status: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthToken = async (req, res, next) => {
  try {
    const token = Buffer.from(JSON.stringify({
      timestamp: Date.now(),
      user: 'precious-list'
    })).toString('base64');

    res.json({
      success: true,
      token,
      expiresIn: 3600
    });
  } catch (error) {
    next(error);
  }
};

export const getAllData = async (req, res, next) => {
  try {
    const data = await dataService.getAllData();

    res.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getPeople = async (req, res, next) => {
  try {
    const people = await dataService.getPeople();

    res.json({
      success: true,
      data: people,
      count: people.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const savePeople = async (req, res, next) => {
  try {
    const result = await dataService.savePeople(req.body);

    res.json({
      success: true,
      message: 'People data saved successfully',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getAssets = async (req, res, next) => {
  try {
    const assets = await dataService.getAssets();

    res.json({
      success: true,
      data: assets,
      count: assets.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const saveAssets = async (req, res, next) => {
  try {
    const result = await dataService.saveAssets(req.body);

    res.json({
      success: true,
      message: 'Assets data saved successfully',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getDocuments = async (req, res, next) => {
  try {
    const documents = await dataService.getDocuments();

    res.json({
      success: true,
      data: documents,
      count: documents.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const saveDocuments = async (req, res, next) => {
  try {
    const result = await dataService.saveDocuments(req.body);

    res.json({
      success: true,
      message: 'Documents data saved successfully',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const getKnowledgeBase = async (req, res, next) => {
  try {
    const knowledgeBase = await dataService.getKnowledgeBase();

    res.json({
      success: true,
      data: knowledgeBase,
      count: knowledgeBase.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const saveKnowledgeBase = async (req, res, next) => {
  try {
    const result = await dataService.saveKnowledgeBase(req.body);

    res.json({
      success: true,
      message: 'Knowledge base saved successfully',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const saveBetaSignup = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required',
        timestamp: new Date().toISOString()
      });
    }

    const result = await dataService.saveBetaSignup(email);

    res.json({
      success: true,
      message: 'Beta signup saved successfully',
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};
