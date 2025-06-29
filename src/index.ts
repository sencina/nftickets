import 'reflect-metadata';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from '@router';
import { ErrorHandling } from '@utils/errors';
import { PORT } from '@env';
import fs from 'fs';
import path from 'path';
import { initializeNFTModule } from '@modules/nft/config/initialize';

require('express-async-errors');

// Load environment variables
dotenv.config();

// Create Express application
const app: Application = express();

// Initialize NFT module
initializeNFTModule();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://nftickets.vercel.app', 'https://nftickets-web.onrender.com'] 
      : ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
  })
);

// Routes
app.use('/api', router);

// Error handling
app.use(ErrorHandling);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 