import mongoose, { Document } from 'mongoose';

export interface IFacultyDocument extends Document {
  name: string;
  code: string;
  description: string;
  contactEmail: string;
  websiteURL: string;
}

const facultySchema = new mongoose.Schema<IFacultyDocument>({
  name: { type: String, required: true, maxlength: 255 },
  code: { type: String, required: true, maxlength: 63 },
  description: { type: String, required: true, maxlength: 1022 },
  contactEmail: { type: String, required: true, maxlength: 255 },
  websiteURL: { type: String, required: true, maxlength: 1022 }
}, { timestamps: true, collection: 'faculties', _id: true });

export interface IFacultyModel {
  _id: string;
  name: string;
  code: string;
  description: string;
  contactEmail: string;
  websiteURL: string;
}


const Faculty = mongoose.model<IFacultyDocument>('Faculty', facultySchema, 'faculties');
export default Faculty;


