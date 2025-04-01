import mongoose, { Document } from 'mongoose';
import { IFacultyDocument, IFacultyModel } from '@src/model/category/faculty/faculty.model';
import { IUniversityDocument, IUniversityModel } from '@src/model/category/organization/university.model';

export interface IFacultyUniversityDocument extends Document {
  faculty: IFacultyDocument;
  university: IUniversityDocument;
  establishedAt: Date;
}

const facultyUniversitySchema = new mongoose.Schema<IFacultyUniversityDocument>({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  establishedAt: { type: Date, required: true, default: new Date() }
}, { timestamps: true, collection: 'faculty_universities', _id: true });

export interface IFacultyUniversityModel {
  _id: string;
  faculty: IFacultyModel;
  university: IUniversityModel;
}

const FacultyUniversity = mongoose.model<IFacultyUniversityDocument>('FacultyUniversity', facultyUniversitySchema, 'faculty_universities');
export default FacultyUniversity;
