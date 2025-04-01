import mongoose from 'mongoose';
import User, { IUserDocument, IUserModel } from '@src/model/framework/user/user.model';
import { IDegreeDocument, IDegreeModel } from '@src/model/category/degree/degree.model';
import { ICountryDocument, ICountryModel } from '@src/model/category/country/country.model';
import { ICertificateDocument, ICertificateModel } from '@src/model/category/degree/certificate.model';
import { UserRole } from '@src/constants/enum/user/userRole.enum';

export interface IInstructorDocument extends IUserDocument {
  degrees: IDegreeDocument[];
  majors: string[];
  certificates: ICertificateDocument[];
  expertise: number;
  biography: string;
  dateOfBirth: Date;
  nationality: ICountryDocument;
}

const instructorSchema = new mongoose.Schema<IInstructorDocument>({
  degrees: { type: [mongoose.Schema.Types.ObjectId], ref: 'Degree', default: [], maxlength: 10, required: false },
  nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  majors: { type: [String], maxlength: 10, default: [], required: false },
  certificates: { type: [mongoose.Schema.Types.ObjectId], ref: 'Certificate', default: [], required: false, maxlength: 50 },
  expertise: { type: Number, default: 0, max: 50 },
  dateOfBirth: { type: Date, required: true, min: new Date('1960-01-01') },
  biography: { type: String, maxlength: 1022, default: '', required: false }
});

export interface IInstructorModel extends IUserModel {
  degrees: IDegreeModel[];
  majors: string[];
  certificates: ICertificateModel[];
  expertise: number;
  biography: string;
  dateOfBirth: Date;
  nationality: ICountryModel;
}


const Instructor = User.discriminator<IInstructorDocument>(UserRole.INSTRUCTOR, instructorSchema);
export default Instructor;
