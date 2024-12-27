import { Bet } from '../../domain/entities/Bets';
import { BetsRepository } from '../../domain/interfaces/Bets.repository';
import { BetModel } from '../models/Bet.model';

export class BetRepositoryMongo implements BetsRepository {
  async create(bet: Bet): Promise<Bet> {
    const newBet = new BetModel(bet);
    await newBet.save();
    return newBet;
  }

  // async getAllByUser(userId: string): Promise<Bet[]> {
  //   const bets = await BetModel.find({ userId });
  //   return bets.map(
  //     (bet) =>
  //       new Bet(bet.userId, bet.eventId, bet.fee, bet.betValue, bet.status)
  //   );
  // }

  // async updateStatus(betId: string, status: string): Promise<Bet> {
  //   const updatedBet = await BetModel.findByIdAndUpdate(
  //     betId,
  //     { status },
  //     { new: true }
  //   );

  // }

  // async getAllByEvent(eventId: string): Promise<Bet[]> {
  //   const bets = await BetModel.find({ eventId });
  //   return bets.map(
  //     (bet) =>
  //       new Bet(bet.userId, bet.eventId, bet.fee, bet.betValue, bet.status)
  //   );
  // }
}
