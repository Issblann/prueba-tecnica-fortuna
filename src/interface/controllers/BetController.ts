import { Request, Response } from 'express';
import { CreateBet } from '../../use-cases/CreateBet';
import { GetBetsByUser } from '../../use-cases/GetBetsByUser';
import { UpdateBetStatus } from '../../use-cases/UpdateBetStatus';

export class BetController {
  constructor(
    private create: CreateBet,
    private getAllByUser: GetBetsByUser,
    private updateStatus: UpdateBetStatus
  ) {}

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

  async updateBetStatus(req: Request, res: Response) {
    const { betId } = req.params;
    const { status } = req.body;

    if (!status || !['Ganada', 'Perdida'].includes(status)) {
      return res.status(400).json({
        error: 'Estado inválido. Debe ser "Ganada" o "Perdida".',
      });
    }
    const updatedBet = await this.updateStatus.execute(betId, status);
    return res.status(200).json({
      updatedBet,
      message: 'Estado de la apuesta actualizado',
    });
  }
}
