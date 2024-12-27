import { SportingEvent } from '../domain/entities/Sporting-events';
import { BetsRepository } from '../domain/interfaces/Bets.repository';
import { SportingEventsRepository } from '../domain/interfaces/Sporting-events.repository';

export class GetSportEventsWithTotalBets {
  constructor(
    private sportEventsRepository: SportingEventsRepository,
    private betRepository: BetsRepository
  ) {}

  async execute(): Promise<SportingEvent[]> {
    const events = await this.sportEventsRepository.getAll();
    const eventsWithBets = [];

    for (const event of events) {
      const bets = await this.betRepository.getAllByEvent(event.id);
      const totalAmount = bets.reduce((sum, bet) => sum + bet.betValue, 0);
      eventsWithBets.push({
        ...event.toObject(),
        totalAmount,
        bets,
      });
    }

    return eventsWithBets;
  }
}
