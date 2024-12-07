import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import flashCardRoutes from './routes/flashCardRoutes.js';
import telemetryRoutes from './routes/telemetryRoutes.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/flashcards', authenticateToken, flashCardRoutes);
app.use('/api/telemetry', authenticateToken, telemetryRoutes);

export default app;