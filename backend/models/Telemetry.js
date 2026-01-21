const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
  username: { type: String, default: 'ESP32' },
  speed: Number,
  distance: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Telemetry', telemetrySchema);