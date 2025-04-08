import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import { protect } from './middleware/authMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// MongoDB connection using try-catch
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if DB fails
  }
};
connectDB();

// Routes
app.use('/expenseTracker/auth', authRoutes);
app.use('/expenseTracker/expenses', expenseRoutes);

// Protected Route Example
app.get('/expenseTracker/dashboard', protect, (req, res) => {
  res.json({ message: `Welcome, user ${req.user}` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
