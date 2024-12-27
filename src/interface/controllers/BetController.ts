import { Request, Response } from 'express';
import { CreateBet } from '../../use-cases/CreateBet';
import { GetBetsByUser } from '../../use-cases/GetBetsByUser';

export class BetController {
  constructor(private create: CreateBet, private getAllByUser: GetBetsByUser) {}

  async createBet(req: Request, res: Response) {
    const bet = await this.create.execute(req.body);
    res.json(bet);
  }

  async getBetsByUser(req: Request, res: Response) {
    const { userId } = req.params;
    const status = req.query.status as string;
    const bets = await this.getAllByUser.execute(userId, status);
    res.json(bets);
  }
}
