import mongoose from 'mongoose';
import { Bet } from '../../domain/entities/Bets';
import { BetsRepository } from '../../domain/interfaces/Bets.repository';
import { BetModel } from '../models/Bet.model';

export class BetRepositoryMongo implements BetsRepository {
  async create(bet: Bet): Promise<Bet> {
    const newBet = new BetModel(bet);
    await newBet.save();
    return newBet;
  }

  async getAllByUser(userId: string, status?: string): Promise<Bet[]> {
    const userIdToObjectId = new mongoose.Types.ObjectId(userId);

    const query: any = { userId: userIdToObjectId };

    if (status) {
      query.status = status;
    }

    const bets = await BetModel.find(query)
      .populate('eventId', 'name date sportType')
      .populate('userId', 'name email');

    return bets;
  }

  async updateStatus(betId: string, status: string): Promise<Bet> {
    const updatedBet = await BetModel.findByIdAndUpdate(
      betId,
      { $set: { status } },
      { new: true }
    );
    if (!updatedBet) {
      throw new Error('Bet not found');
    }
    return updatedBet;
  }
}
