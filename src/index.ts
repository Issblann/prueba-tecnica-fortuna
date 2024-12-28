import { app } from './app';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URI_DOCKER;
    await mongoose.connect(mongoUri as string);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
