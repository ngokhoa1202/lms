import { EmploymentStatus } from '@src/constants/enum/employmentStatus.enum';
import User, { IUser } from './user.model';
import mongoose from 'mongoose';
import { IUniversity } from '@src/model/category/organization/university.model';
import { UserRole } from '@src/constants/enum/user/userRole.enum';


export interface IStudent extends IUser {
  interests: [string];
  employmentStatus: EmploymentStatus;
  major: string;
  university: IUniversity;
}

const studentSchema = new mongoose.Schema<IStudent>({
  interests: { type: [String], maxlength: 255, default: [] },
  employmentStatus: { type: String, enum: Object.values(EmploymentStatus), default: EmploymentStatus.UNEMPLOYED },
  major: { type: String, maxlength: 255, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true }
}, { collection: 'users' });

export const Student = User.discriminator(UserRole.STUDENT, studentSchema);
