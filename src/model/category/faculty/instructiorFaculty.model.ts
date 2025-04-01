import { IInstructorDocument } from '@src/model/framework/user/instructor.model';
import mongoose, { Document } from 'mongoose';
import { IFacultyDocument } from '@src/model/category/faculty/faculty.model';
import { FacultyRole } from '@src/constants/enum/faculty/facultyRole.enum';

export interface IFacultyRole {
  startDate: Date;
  endDate: Date;
  role: FacultyRole;
}

export interface IInstructorFaculty extends Document {
  instructor: IInstructorDocument;
  faculty: IFacultyDocument;
  roles: IFacultyRole[];
}

const instructorFacultySchema = new mongoose.Schema<IInstructorFaculty>({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  roles: { type: [{ startDate: Date, endDate: Date, role: FacultyRole }], default: [], required: false }
}, { timestamps: true, collection: 'instructor_faculties', versionKey: true });

const InstructorFaculty = mongoose.model<IInstructorFaculty>('InstructorFaculty', instructorFacultySchema, 'instructor_faculties');
export default InstructorFaculty;
