import { IOrganizationDocument } from '@src/model/category/organization/organization.model';
import mongoose, { Document } from 'mongoose';

export interface ICertificateDocument extends Document {
  _id: string;
  name: string;
  organization: IOrganizationDocument;
  validityDuration: number;
  totalScore: number;
  isVerified: boolean;
  subjects: string[];
}

const certificateSchema = new mongoose.Schema<ICertificateDocument>({
  name: { type: String, required: true, maxlength: 255 },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  validityDuration: { type: Number, required: true, min: 0, max: 100 },
  totalScore: { type: Number, required: true },
  subjects: { type: [String], required: true, maxlength: 255 },
  isVerified: { type: Boolean, required: true, default: false }
}, { collection: 'certificates', _id: true, timestamps: true });

export interface ICertificateModel {
  _id: string;
  name: string;
  organization: IOrganizationDocument;
  validityDuration: number;
  totalScore: number;
  isVerified: boolean;
  subjects: string[];
}

const Certificate = mongoose.model<ICertificateDocument>('Certificate', certificateSchema);
export default Certificate;
