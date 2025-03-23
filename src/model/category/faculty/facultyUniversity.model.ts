import mongoose, { Document } from 'mongoose';
import { IFaculty } from '@src/model/category/faculty/faculty.model';
import { IUniversity } from '@src/model/category/organization/university.model';

export interface IFacultyUniversity extends Document {
  faculty: IFaculty;
  university: IUniversity;
  establishedAt: Date;
}

const facultyUniversitySchema = new mongoose.Schema<IFacultyUniversity>({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  establishedAt: { type: Date, required: true, default: new Date() }
}, { timestamps: true, collection: 'faculty_universities' });

const FacultyUniversity = mongoose.model<IFacultyUniversity>('FacultyUniversity', facultyUniversitySchema, 'faculty_universities');
export default FacultyUniversity;
