import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import feedbackRouter from './routes/feedbackRoutes.js';
import orderRouter from './routes/orderRoutes.js';

import connectDB from './database/db.js';

// Importing dotenv to load environment variables from a .env file
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// Make a database connection
connectDB();

// Define routes
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', feedbackRouter);
app.use('/api', orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
