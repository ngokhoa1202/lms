import { AcademicRank } from '@src/constants/enum/degree/academicRank.enum';
import mongoose, { Document } from 'mongoose';
import { IUniversity } from '@src/model/category/organization/university.model';
import { StudyFormat } from '@src/constants/enum/degree/studyFormat.enum';
import { AcademicGrade } from '@src/constants/enum/degree/academicGrade.enum';


export interface IDegree extends Document {
  _id: number;
  rank: AcademicRank;
  major: string;
  achieveDate: Date;
  university: IUniversity;
  isVerified: boolean;
  studyFormat: StudyFormat;
  gpa: number;
  grade: AcademicGrade;
}


const degreeSchema = new mongoose.Schema<IDegree>({
  _id: { type: Number, required: true },
  rank: { type: String, enum: AcademicRank, required: true },
  major: { type: String, required: true, maxlength: 255 },
  achieveDate: { type: Date, required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  isVerified: { type: Boolean, required: true, default: false },
  studyFormat: { type: String, enum: StudyFormat, required: true, default: StudyFormat.FULL_TIME },
  grade: { type: String, enum: AcademicGrade, required: false }
}, { _id: false, collection: 'degrees', timestamps: true, versionKey: true });

const Degree = mongoose.model<IDegree>('Degree', degreeSchema, 'degrees');
export default Degree;
