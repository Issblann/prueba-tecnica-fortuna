import { Bet } from '../entities/Bets';

export interface BetsRepository {
  create: (data: Bet) => Promise<Bet>;
  getAllByUser: (userId: string) => Promise<Bet[]>;
  updateStatus: (id: string, status: string) => Promise<Bet>;
  getAllByEvent: (eventId: string) => Promise<Bet[]>;
}
