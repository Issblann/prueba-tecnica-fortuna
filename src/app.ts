import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './interface/routes/userRoutes';
import { betRoutes } from './interface/routes/betRoutes';
import { eventRoutes } from './interface/routes/eventRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', userRoutes, betRoutes, eventRoutes);

export { app };
