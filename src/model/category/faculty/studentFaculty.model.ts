import { IStudent } from '@src/model/framework/user/student.model';
import mongoose, { Document } from 'mongoose';
import { IFacultyDocument } from '@src/model/category/faculty/faculty.model';
import { IUniversityDocument } from '@src/model/category/organization/university.model';
import { AcademicGrade } from '@src/constants/enum/degree/academicGrade.enum';
import { GraduateStatus } from '@src/constants/enum/graduateStatus.enum';

export interface IStudentFacultyUniversity extends Document {
  student: IStudent;
  faculty: IFacultyDocument;
  university: IUniversityDocument;
  status: GraduateStatus;
  graduateGrade: AcademicGrade;
  enrollmentDate: Date;
  graduateDate: Date;
  graduateGpa: number;
}

const studentFacultyUniversitySchema = new mongoose.Schema<IStudentFacultyUniversity>({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
  status: { type: String, required: true, enum: Object.values(GraduateStatus), default: GraduateStatus.UNDER_GRADUATE },
  graduateGrade: { type: String, required: false, enum: Object.values(AcademicGrade) },
  enrollmentDate: { type: Date, required: true },
  graduateDate: { type: Date, required: false },
  graduateGpa: { type: Number, required: false, min: 0, max: 4.0 }
});

const StudentFacultyUniversity = mongoose.model<IStudentFacultyUniversity>('StudentFacultyUniversity',
  studentFacultyUniversitySchema, 'student_ faculty_universities');

export default StudentFacultyUniversity;
