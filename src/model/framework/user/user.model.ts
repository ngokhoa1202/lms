import { UserRole } from '@src/constants/enum/user/userRole.enum';
import Util from '@src/utils/index.util';
import mongoose, { Document } from 'mongoose';

export interface IUserDocument extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

const userSchema = new mongoose.Schema<IUserDocument>({
  _id: { type: String, default: Util.Uuid.v4, required: true, maxlength: 36, index: true },
  username: { type: String, unique: true, required: true, maxlength: 255 },
  email: { type: String, unique: true, immutable: true, required: true, maxlength: 255 },
  password: { type: String, required: true, maxlength: 255 },
  role: { type: String, default: UserRole.NONE, enum: Object.values(UserRole), maxlength: 255 },
  firstName: { type: String, required: true, maxlength: 255 },
  lastName: { type: String, required: true, maxlength: 255 }
}, { _id: false, discriminatorKey: 'role', collection: 'users', timestamps: true });

export interface IUserModel {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

const User = mongoose.model<IUserDocument>('User', userSchema, 'users');
export default User;

