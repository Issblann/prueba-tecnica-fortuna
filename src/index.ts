import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRoutes } from './interface/routes/userRoutes';
import { betRoutes } from './interface/routes/betRoutes';
import { eventRoutes } from './interface/routes/eventRoutes';

dotenv.config();
const app = express();

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB conectado');
  } catch (error) {
    console.log('MongoDB connection failed', error);
    process.exit(1);
  }
};

connectDB();

app.use('/api/v1', userRoutes, betRoutes, eventRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
