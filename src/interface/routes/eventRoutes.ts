import { Router } from 'express';
import { SportingEventsRepositoryMongo } from '../../infrastructure/repositories/EventRepositoryMongo';
import { CreateEvent } from '../../use-cases/CreateEvent';
import { EventController } from '../controllers/EventController';

const router = Router();
const eventRepository = new SportingEventsRepositoryMongo();
const createEvent = new CreateEvent(eventRepository);
const eventController = new EventController(createEvent);

router.post('/events', (req, res) => eventController.createEvent(req, res));
export { router as eventRoutes };
