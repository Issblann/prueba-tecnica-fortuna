import { SportingEvent } from '../../domain/entities/Sporting-events';
import { SportingEventsRepository } from '../../domain/interfaces/Sporting-events.repository';
import { SportingEventsModel } from '../models/Sporting-events.model';

export class SportingEventsRepositoryMongo implements SportingEventsRepository {
  async create(event: SportingEvent): Promise<SportingEvent> {
    const createdEvent = await SportingEventsModel.create(event);
    return new SportingEvent(
      createdEvent.name,
      createdEvent.date,
      createdEvent.sportType
    );
  }

  async getAll(): Promise<SportingEvent[]> {
    const events = await SportingEventsModel.find();
    return events.map(
      (event) => new SportingEvent(event.name, event.date, event.sportType)
    );
  }

  async getById(eventId: string): Promise<SportingEvent | null> {
    const event = await SportingEventsModel.findById(eventId);
    if (!event) return null;
    return new SportingEvent(event.name, event.date, event.sportType);
  }
}
