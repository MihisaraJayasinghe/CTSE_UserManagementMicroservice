const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express(); // ✅ Create app first

// 🔐 Security Middleware
app.use(helmet()); // ✅ Now it's safe
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// 🛡️ CORS Middleware
app.use(cors({
  origin: 'http://localhost:3000' ,

  methods: ['GET', 'POST', 'PUT', 'DELETE'] ,
  allowedHeaders: ['Content-Type', 'Authorization' ]
}));

// 📦 API Routes
app.use('/api/auth', require('./routes/auth'));

// 🔌 DB Connection
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));















