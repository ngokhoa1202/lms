import mongoose, { Document } from 'mongoose';
import { IUniversity } from '@src/model/category/organization/university.model';

export interface IFaculty extends Document {
  name: string;
  code: string;
  description: string;
  contactEmail: string;
  websiteURL: string;
}

const facultySchema = new mongoose.Schema<IFaculty>({
  name: { type: String, required: true, maxlength: 255 },
  code: { type: String, required: true, maxlength: 63 },
  description: { type: String, required: true, maxlength: 1022 },
  contactEmail: { type: String, required: true, maxlength: 255 },
  websiteURL: { type: String, required: true, maxlength: 1022 }
}, { timestamps: true, collection: 'faculties' });

const Faculty = mongoose.model<IFaculty>('Faculty', facultySchema, 'faculties');
export default Faculty;


