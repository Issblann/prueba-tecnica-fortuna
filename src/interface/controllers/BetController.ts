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
    try {
      const bet = await this.create.execute(req.body);
      return res.status(201).json(bet); // 201 Created
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al crear la apuesta.',
        message: error.message || 'Error inesperado.',
      });
    }
  }

  async getBetsByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const status = req.query.status as string;
      const bets = await this.getAllByUser.execute(userId, status);
      return res.status(200).json(bets); // 200 OK
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al obtener las apuestas del usuario.',
        message: error.message || 'Error inesperado.',
      });
    }
  }

  async updateBetStatus(req: Request, res: Response) {
    try {
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
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        error: 'Hubo un problema al actualizar el estado de la apuesta.',
        message: error.message || 'Error inesperado.',
      });
    }
  }
}
