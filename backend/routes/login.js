const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const verifyToken = require('../middleware/auth');

// POST /api/login
router.post('/', async (req, res) => {
  const { username, success, ipAddress } = req.body;

  // Validasi input
  if (!username || typeof success !== 'boolean' || !ipAddress) {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  try {
    const loginData = new Login({
      username,
      success,
      ipAddress,
      timestamp: new Date()
    });

    await loginData.save();
    res.status(201).json({ message: 'Login data saved successfully' });
  } catch (err) {
    console.error('Error saving login data:', err);
    res.status(500).json({ error: 'Failed to save login data' });
  }
});

// GET /api/login
router.get('/', verifyToken, async (req, res) => {
  try {
    const data = await Login.find().sort({ timestamp: -1 });
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error fetching login data:', err);
    res.status(500).json({ error: 'Failed to fetch login data' });
  }
});

module.exports = router;
