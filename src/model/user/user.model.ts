import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  _id: { type: String, default: uuidv4, required: true, maxlength: 36 },
  username: { type: String, unique: true, required: true, maxlength: 255 },
  email: { type: String, unique: true, immutable: true, required: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  role: { type: String, default: 'student', lowercase: true, maxlength: 255 },
  firstName: { type: String, required: true, maxlength: 255 },
  lastName: { type: String, required: true, maxlength: 255 },
  createdAt: { type: Date, default: new Date(), immutable: true },
  updatedAt: { type: Date, default: new Date() }
}, { _id: false, discriminatorKey: 'role', collection: 'users' });

const User = mongoose.model<IUser>('User', userSchema, 'users');
export default User;

