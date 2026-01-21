const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  loginTime: { type: Date, default: Date.now },
  status: String // "success" atau "failed"
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
