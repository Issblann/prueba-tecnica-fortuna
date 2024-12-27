import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  balance: number;
}

//Esquema para usuarios
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

const UserModel = mongoose.model<IUser>('User', UserSchema);
export { UserModel, IUser };
