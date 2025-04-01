import { TeachingRole } from '@src/constants/enum/user/teachingRole.enum';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { IInstructorDocument } from '@src/model/framework/user/instructor.model';
import { ICourse } from '@src/model/framework/course/course.model';

export interface IInstructorCourse extends Document {
  instructor: IInstructorDocument;
  course: ICourse;
  roles: TeachingRole[];
  assignedAt: Date;
}

const instructorCourseSchema = new mongoose.Schema<IInstructorCourse>({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: false },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  assignedAt: { type: Date, required: true, default: new Date() },
  roles: { type: [String], required: true, enum: Object.values(TeachingRole) }
});

const InstructorCourse = mongoose.model<IInstructorCourse>('InstructorCourse', instructorCourseSchema, 'instructor_courses');
export default InstructorCourse;
