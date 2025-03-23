import mongoose from 'mongoose';
import User, { IUser } from '@src/model/framework/user/user.model';
import { IDegree } from '@src/model/category/degree/degree.model';
import { ICountry } from '@src/model/category/country/country.model';
import { ICertificate } from '@src/model/category/degree/certificate.model';
import { UserRole } from '@src/constants/enum/user/userRole.enum';

export interface IInstructor extends IUser {
  degrees: [IDegree];
  majors: [string];
  certificates: [ICertificate];
  expertise: number;
  biography: string;
  dateOfBirth: Date;
  nationality: ICountry;
}

const instructorSchema = new mongoose.Schema<IInstructor>({
  degrees: { type: [mongoose.Schema.Types.ObjectId], ref: 'Degree', default: [], maxlength: 10, required: false },
  nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  majors: { type: [String], maxlength: 10, default: [], required: false },
  certificates: { type: [mongoose.Schema.Types.ObjectId], ref: 'Certificate', default: [], required: false, maxlength: 50 },
  expertise: { type: Number, default: 0, max: 50 },
  dateOfBirth: { type: Date, required: true, min: new Date('1960-01-01') },
  biography: { type: String, maxlength: 1022, default: '', required: false }
});

const Instructor = User.discriminator(UserRole.INSTRUCTOR, instructorSchema);
export default Instructor;
