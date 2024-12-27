import mongoose, { Document, Schema } from 'mongoose';

interface SportingEvents extends Document {
  name: string;
  date: Date;
  sportType: string;
}

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: {
    type: Date,
    required: true,
  },
  sportType: { type: String, required: true },
});

const SportingEventsModel = mongoose.model<SportingEvents>(
  'Event',
  EventSchema
);
export { SportingEventsModel, SportingEvents };
