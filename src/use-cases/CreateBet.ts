import { Bet } from '../domain/entities/Bets';
import { BetsRepository } from '../domain/interfaces/Bets.repository';

export class CreateBet {
  constructor(private betRepository: BetsRepository) {}

  async execute(bet: Bet): Promise<Bet> {
    return this.betRepository.create(bet);
  }
}
