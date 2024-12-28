import { Bet } from '../domain/entities/Bets';
import { BetsRepository } from '../domain/interfaces/Bets.repository';

export class UpdateBetStatus {
  constructor(private betRepository: BetsRepository) {}

  async execute(betId: string, status: string): Promise<Bet> {
    return await this.betRepository.updateStatus(betId, status);
  }
}
