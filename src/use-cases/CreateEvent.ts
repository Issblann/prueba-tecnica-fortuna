import { SportingEvent } from '../domain/entities/Sporting-events';
import { SportingEventsRepository } from '../domain/interfaces/Sporting-events.repository';

export class CreateEvent {
  constructor(private eventRepository: SportingEventsRepository) {}

  async execute(event: SportingEvent): Promise<SportingEvent> {
    return this.eventRepository.create(event);
  }
}
