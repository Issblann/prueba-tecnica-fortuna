import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface Bet extends Document {
  userId: ObjectId;
  eventId: ObjectId;
  betValue: number;
  fee: number;
  status: string;
}

const BetSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event',
  },
  betValue: { type: Number, required: true },
  fee: { type: Number, required: true },
  status: { type: String, required: true },
});

const BetModel = mongoose.model<Bet>('Bet', BetSchema);
export { BetModel, Bet };
