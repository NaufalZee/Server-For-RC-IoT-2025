const express = require('express');
const router = express.Router();
const Telemetry = require('../models/Telemetry');

// GET terbaru
router.get('/latest', async (req, res) => {
  try {
    const latest = await Telemetry.findOne().sort({ timestamp: -1 });
    if (!latest) {
      return res.status(404).json({ message: 'No telemetry data found' });
    }
    res.status(200).json(latest);
  } catch (error) {
    console.error('Error fetching latest telemetry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST telemetry
router.post('/', async (req, res) => {
  try {
    const { username, speed, distance } = req.body;

    // ✅ Log data masuk dari ESP32
    console.log('📥 Data POST diterima:', {
      username,
      speed,
      distance
    });

    const newTelemetry = new Telemetry({
      username: username || "ESP32", // default jika tidak ada
      speed,
      distance,
      timestamp: new Date()
    });

    await newTelemetry.save();

    // ✅ Log data yang berhasil disimpan
    console.log('✅ Telemetry berhasil disimpan:', newTelemetry);

    res.status(201).json({ message: 'Telemetry saved', data: newTelemetry });
  } catch (error) {
    console.error('❌ Error saving telemetry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;