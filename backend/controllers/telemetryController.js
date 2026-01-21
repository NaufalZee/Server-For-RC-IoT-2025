const Telemetry = require('../models/Telemetry');

exports.receiveTelemetry = async (req, res) => {
  try {
    const data = new Telemetry(req.body);
    await data.save();
    res.status(201).json({ message: 'Telemetry saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTelemetry = async (req, res) => {
  try {
    const data = await Telemetry.find().sort({ timestamp: -1 }).limit(50);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
