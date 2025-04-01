import { AcademicRank } from '@src/constants/enum/degree/academicRank.enum';
import mongoose, { Document } from 'mongoose';
import { IUniversityDocument, IUniversityModel } from '@src/model/category/organization/university.model';
import { StudyFormat } from '@src/constants/enum/degree/studyFormat.enum';
import { AcademicGrade } from '@src/constants/enum/degree/academicGrade.enum';
import { IFacultyDocument, IFacultyModel } from '@src/model/category/faculty/faculty.model';


export interface IDegreeDocument extends Document {
  rank: AcademicRank;
  major: string;
  issueDate: Date;
  university: IUniversityDocument;
  faculty: IFacultyDocument;
  isVerified: boolean;
  studyFormat: StudyFormat;
  grade: AcademicGrade;
}


const degreeSchema = new mongoose.Schema<IDegreeDocument>({
  rank: { type: String, enum: AcademicRank, required: true },
  major: { type: String, required: true, maxlength: 255 },
  issueDate: { type: Date, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  isVerified: { type: Boolean, required: true, default: false },
  studyFormat: { type: String, enum: StudyFormat, required: true, default: StudyFormat.FULL_TIME },
  grade: { type: String, enum: AcademicGrade, required: false }
}, { _id: true, collection: 'degrees', timestamps: true, versionKey: true });

export interface IDegreeModel {
  _id: string;
  rank: AcademicRank;
  major: string;
  issueDate: Date;
  university: IUniversityModel;
  faculty: IFacultyModel;
  isVerified: boolean;
  studyFormat: StudyFormat;
  grade: AcademicGrade;
}

const Degree = mongoose.model<IDegreeDocument>('Degree', degreeSchema, 'degrees');
export default Degree;
