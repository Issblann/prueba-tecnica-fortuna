import { SportingEvent } from '../domain/entities/Sporting-events';
import { BetsRepository } from '../domain/interfaces/Bets.repository';
import { SportingEventsRepository } from '../domain/interfaces/Sporting-events.repository';

export class GetSportEventsWithTotalBets {
  constructor(private sportEventsRepository: SportingEventsRepository) {}

  async execute(): Promise<SportingEvent[]> {
    return await this.sportEventsRepository.getAllWithBets();
  }
}
