import mongoose, { Document } from 'mongoose';
import { ICorporation } from '@src/model/category/organization/corporation.model';

export interface ICertificate extends Document {
  _id: number;
  name: string;
  organization: ICorporation;
  validityDuration: number;
  totalScore: number;
  isVerified: boolean;
  subjects: string[];
}

const certificateSchema = new mongoose.Schema<ICertificate>({
  _id: { type: Number, required: true },
  name: { type: String, required: true, maxlength: 255 },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Corporation', required: true },
  validityDuration: { type: Number, required: true, min: 0, max: 100 },
  totalScore: { type: Number, required: true },
  subjects: { type: [String], required: true, maxlength: 255 },
  isVerified: { type: Boolean, required: true, default: false }
}, { _id: false, collection: 'certificates' });

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);
export default Certificate;
