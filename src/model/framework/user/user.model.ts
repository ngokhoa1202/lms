import { UserRole } from '@src/constants/enum/user/userRole.enum';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

const userSchema = new mongoose.Schema<IUser>({
  _id: { type: String, default: uuidv4, required: true, maxlength: 36 },
  username: { type: String, unique: true, required: true, maxlength: 255 },
  email: { type: String, unique: true, immutable: true, required: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  role: { type: String, default: UserRole.STUDENT, enum: Object.values(UserRole), maxlength: 255 },
  firstName: { type: String, required: true, maxlength: 255 },
  lastName: { type: String, required: true, maxlength: 255 }
}, { _id: false, discriminatorKey: 'role', collection: 'users', timestamps: true });

const User = mongoose.model<IUser>('User', userSchema, 'users');
export default User;

