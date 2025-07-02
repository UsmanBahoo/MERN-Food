import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import adminRouter from './routes/admin.js';
import adminAuthRouter from './routes/adminAuth.js';
import productRouter from './routes/productRoutes.js';


import connectDB from './database/db.js';

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importing dotenv to load environment variables from a .env file
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const productsDir = path.join(uploadsDir, 'products');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
}

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
  console.log('Created products directory');
}

// Make a database connection
connectDB();

// Define routes
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', feedbackRouter);
app.use('/api', orderRouter);
app.use('/api', adminRouter);
app.use('/api/admin', adminAuthRouter);
app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the MERN Food App API');
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
