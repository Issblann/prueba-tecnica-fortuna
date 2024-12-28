import { Router } from 'express';
import { SportingEventsRepositoryMongo } from '../../infrastructure/repositories/EventRepositoryMongo';
import { CreateEvent } from '../../use-cases/CreateEvent';
import { EventController } from '../controllers/EventController';
import { GetSportEventsWithTotalBets } from '../../use-cases/GetEventsWithTotalBets';

const router = Router();
const eventRepository = new SportingEventsRepositoryMongo();
const createEvent = new CreateEvent(eventRepository);
const getEventsWithTotalBets = new GetSportEventsWithTotalBets(eventRepository);
const eventController = new EventController(
  createEvent,
  getEventsWithTotalBets
);

router.post('/events', (req, res) => eventController.createEvent(req, res));
router.get('/events', (req, res) =>
  eventController.getAllEventsWithBets(req, res)
);
export { router as eventRoutes };
