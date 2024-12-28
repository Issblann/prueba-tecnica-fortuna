import { SportingEvent } from '../entities/Sporting-events';

export interface SportingEventsRepository {
  create: (data: SportingEvent) => Promise<SportingEvent>;
  getAllWithBets: () => Promise<SportingEvent[]>;
}
