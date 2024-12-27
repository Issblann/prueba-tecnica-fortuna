import { Router } from 'express';
import { BetRepositoryMongo } from '../../infrastructure/repositories/BetRepositoryMongo';
import { CreateBet } from '../../use-cases/CreateBet';
import { BetController } from '../controllers/BetController';
import { GetBetsByUser } from '../../use-cases/GetBetsByUser';

const router = Router();
const betRepository = new BetRepositoryMongo();
const createBet = new CreateBet(betRepository);
const getBetsByUser = new GetBetsByUser(betRepository);
const betController = new BetController(createBet, getBetsByUser);

router.post('/bets', (req, res) => betController.createBet(req, res));
router.get('/bets/:userId', (req, res) =>
  betController.getBetsByUser(req, res)
);
export { router as betRoutes };
