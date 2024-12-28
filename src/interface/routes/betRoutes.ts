import { Router } from 'express';
import { BetRepositoryMongo } from '../../infrastructure/repositories/BetRepositoryMongo';
import { CreateBet } from '../../use-cases/CreateBet';
import { BetController } from '../controllers/BetController';
import { GetBetsByUser } from '../../use-cases/GetBetsByUser';
import { UpdateBetStatus } from '../../use-cases/UpdateBetStatus';

const router = Router();

const betRepository = new BetRepositoryMongo();
const createBet = new CreateBet(betRepository);
const getBetsByUser = new GetBetsByUser(betRepository);
const updateBetStatus = new UpdateBetStatus(betRepository);
const betController = new BetController(
  createBet,
  getBetsByUser,
  updateBetStatus
);

router.put('/bets/:betId/status', async (req, res) => {
  await betController.updateBetStatus(req, res);
});

router.post('/bets', async (req, res) => {
  await betController.createBet(req, res);
});

router.get('/bets/:userId', async (req, res) => {
  await betController.getBetsByUser(req, res);
});

export { router as betRoutes };
