import { Router } from 'express';
import { BetRepositoryMongo } from '../../infrastructure/repositories/BetRepositoryMongo';
import { CreateBet } from '../../use-cases/CreateBet';
import { BetController } from '../controllers/BetController';

const router = Router();
const betRepository = new BetRepositoryMongo();
const createBet = new CreateBet(betRepository);
const betController = new BetController(createBet);

router.post('/bets', (req, res) => betController.createBet(req, res));
export { router as betRoutes };
