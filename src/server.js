// src/server.js
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

// Initialize Express app
const app = express();

app.use(cookieParser());
const PORT = 3000;

// Re-create __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Essential to read req.body!

// Routes
app.use('/auth', authRoutes);

// Static files
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Pomodoro server running at http://localhost:${PORT}`);
});