import { Bet } from '../domain/entities/Bets';
import { BetsRepository } from '../domain/interfaces/Bets.repository';

export class GetBetsByUser {
  constructor(private betRepository: BetsRepository) {}

  async execute(userId: string): Promise<Bet[]> {
    return await this.betRepository.getAllByUser(userId);
  }
}
