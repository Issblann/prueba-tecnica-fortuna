import { Bet } from '../domain/entities/Bets';
import { BetsRepository } from '../domain/interfaces/Bets.repository';

export class CreateBet {
  constructor(private betRepository: BetsRepository) {}

  async execute(
    userId: string,
    eventId: string,
    betValue: number,
    fee: number,
    status: string
  ): Promise<Bet> {
    const bet = new Bet(userId, eventId, betValue, fee, 'pendiente');
    return await this.betRepository.create(bet);
  }
}
