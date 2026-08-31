require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const listingRoutes = require('./routes/listings');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend assets
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/listings', listingRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🏘️ Porshi API is running' });
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/porshi';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully ✓');
    app.listen(PORT, () => console.log(`Porshi Server running: http://localhost:${PORT}`));
  })
  .catch(err => {
    console.warn(`MongoDB not connected (${err.message}). Starting server in standalone mode.`);
    app.listen(PORT, () => console.log(`Porshi Server running in standalone mode: http://localhost:${PORT}`));
  });
