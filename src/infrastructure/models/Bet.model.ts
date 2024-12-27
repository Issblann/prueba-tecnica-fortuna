import mongoose, { Document, Schema } from 'mongoose';

interface Bet extends Document {
  userId: string;
  eventId: string;
  betValue: number;
  fee: number;
  status: string;
}

const BetSchema = new Schema({
  userId: { type: String, required: true },
  eventId: {
    type: String,
    required: true,
  },
  betValue: { type: Number, required: true },
  fee: { type: Number, required: true },
  status: { type: String, required: true },
});

const BetModel = mongoose.model<Bet>('Bet', BetSchema);
export { BetModel, Bet };
