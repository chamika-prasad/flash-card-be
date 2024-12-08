const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const flashCardRoutes = require('./routes/flashCardRoutes.js');
const telemetryRoutes = require('./routes/telemetryRoutes.js');
const { authenticateToken } = require('./middleware/authMiddleware.js');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/flashcards', authenticateToken, flashCardRoutes);
app.use('/api/telemetry', authenticateToken, telemetryRoutes);

module.exports = app;
