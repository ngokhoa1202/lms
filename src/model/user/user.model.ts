import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  age: number;
}

const userSchema = new mongoose.Schema<IUser>({
  _id: { type: String, default: uuidv4 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
}, { _id: false });

const User = mongoose.model<IUser>('User', userSchema, 'users');

export default User;
