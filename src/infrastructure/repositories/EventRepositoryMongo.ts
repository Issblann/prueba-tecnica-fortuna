import { SportingEvent } from '../../domain/entities/Sporting-events';
import { SportingEventsRepository } from '../../domain/interfaces/Sporting-events.repository';
import { SportingEventsModel } from '../models/Sporting-events.model';

export class SportingEventsRepositoryMongo implements SportingEventsRepository {
  async create(event: SportingEvent): Promise<SportingEvent> {
    const newEvent = new SportingEventsModel(event);
    await newEvent.save();
    return newEvent;
  }

  async getAllWithBets(): Promise<SportingEvent[]> {
    const events = await SportingEventsModel.aggregate([
      {
        $lookup: {
          from: 'bets',
          localField: '_id',
          foreignField: 'eventId',
          as: 'bets',
        },
      },
      {
        $unwind: {
          path: '$bets',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          date: { $first: '$date' },
          sportType: { $first: '$sportType' },
          totalBet: { $sum: '$bets.betValue' },
          bets: { $push: '$bets' },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          date: 1,
          sportType: 1,
          totalBet: 1,
          bets: 1,
        },
      },
    ]);

    return events;
  }
}
