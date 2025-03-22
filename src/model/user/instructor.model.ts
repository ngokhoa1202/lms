import mongoose from 'mongoose';
import { IUser } from './user.model';
import User from './user.model';

export interface IInstructor extends IUser {
  degrees: [string];
  majors: [string];
  certificates: [string];
  expertise: number;
  biography: string;
  age: number;
}

const instructorSchema = new mongoose.Schema<IInstructor>({
  degrees: { type: [String], maxlength: 255, default: [] },
  majors: { type: [String], maxlength: 255, default: [] },
  certificates: { type: [String], maxlength: 255, default: [] },
  expertise: { type: Number, default: 0, max: 50 }
});

export const Instructor = User.discriminator('Instructor', instructorSchema);
