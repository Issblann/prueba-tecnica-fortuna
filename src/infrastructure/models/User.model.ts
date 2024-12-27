import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  balance: number;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Por favor ingresa un correo válido'],
  },
  balance: { type: Number, required: true },
});

const UserModel = mongoose.model<User>('User', UserSchema);
export { UserModel, User };
