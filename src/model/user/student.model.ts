import { EmploymentStatus } from '@src/constants/enum/employmentStatus.enum';
import User, { IUser } from './user.model';
import mongoose from 'mongoose';


export interface IStudent extends IUser {
  interests: [string];
  employmentStatus: EmploymentStatus;
  major: string;
}

const studentSchema = new mongoose.Schema<IStudent>({
  interests: { type: [String], maxlength: 255, default: [] },
  employmentStatus: { type: String, enum: Object.values(EmploymentStatus), default: EmploymentStatus.UNEMPLOYED },
  major: { type: String, maxlength: 255, required: true }
});

export const Student = User.discriminator('Student', studentSchema);