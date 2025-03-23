import { CourseLevel } from '@src/constants/enum/course/courseLevel.enum';
import { Document } from 'mongoose';
export interface ICourse extends Document {
  _id: string;
  title: string;
  courseCode: string;
  description: string;
  level: CourseLevel;
  credit: number;
  language: string[];
  startDate: Date;
  duration: number;
}
