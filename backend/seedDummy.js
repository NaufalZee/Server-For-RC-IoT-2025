require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Telemetry = require('./models/Telemetry');
const User = require('./models/User');
const LoginLog = require('./models/Login'); // Ini adalah log login, walau filenya bernama Login.js

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding.');

    // Kosongkan koleksi lama (opsional)
    await Telemetry.deleteMany();
    await User.deleteMany();
    await LoginLog.deleteMany();

    // Buat user dummy
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      username: 'esp32user',
      password: hashedPassword
    });

    // Buat data telemetry dummy
    const telemetryData = [
      {
        userId: user._id,
        distance: 12.5, // km
        speed: 40, // km/h
        timestamp: new Date()
      },
      {
        userId: user._id,
        distance: 7.3,
        speed: 25,
        timestamp: new Date(Date.now() - 3600000) // 1 jam lalu
      }
    ];
    await Telemetry.insertMany(telemetryData);

    // Buat log login dummy
    await LoginLog.create({
      userId: user._id,
      username: user.username,
      status: 'success'
    });

    console.log('✅ Dummy data berhasil dimasukkan!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Gagal mengisi dummy data:', err);
    process.exit(1);
  }
}

seedData();
