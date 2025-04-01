import User, { IUserDocument } from './user.model';
import mongoose from 'mongoose';
import { UserRole } from '@src/constants/enum/user/userRole.enum';
import { ICityDocument } from '@src/model/category/country/city.model';
import { ICountryDocument } from '@src/model/category/country/country.model';


export interface IStudent extends IUserDocument {
  studentId: string;
  majors: [string];
  temporaryAddress: string;
  temporaryCity: ICityDocument;
  permanentAddress: string;
  permanentCity: ICityDocument;
  dateOfBirth: Date;
  nationality: ICountryDocument;
}

const studentSchema = new mongoose.Schema<IStudent>({
  studentId: { type: String, required: true, unique: true, maxlength: 63 },
  majors: { type: [String], maxlength: 10, required: true },
  temporaryAddress: { type: String, required: true, maxlength: 255 },
  temporaryCity: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  permanentAddress: { type: String, required: true, maxlength: 255 },
  permanentCity: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  dateOfBirth: { type: Date, required: true, min: new Date('1960-01-01') },
  nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true }
});

export const Student = User.discriminator(UserRole.STUDENT, studentSchema);
