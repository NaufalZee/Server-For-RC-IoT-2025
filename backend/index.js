require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// Import routes
const telemetryRoutes = require('./routes/telemetry');
const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // ⬅️ Pindah ke atas
app.use(express.json());

// Routes
//app.use('/api/auth', require(r'./routes/auth')); // atau './routes/login'
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/login', loginRoutes); // disarankan pakai huruf kecil di endpoint
app.use('/api/auth', authRoutes);

// MongoDB Atlas Connection
console.log('ENV MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server running on port ${PORT} and accessible on LAN');
});