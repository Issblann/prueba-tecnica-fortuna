import { Request, Response } from 'express';
import { CreateBet } from '../../use-cases/CreateBet';

export class BetController {
  constructor(private create: CreateBet) {}

  async createBet(req: Request, res: Response) {
    const bet = await this.create.execute(req.body);
    res.json(bet);
  }
}
