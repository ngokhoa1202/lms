import { IInstructorDocument } from '@src/model/framework/user/instructor.model';
import mongoose, { Document } from 'mongoose';
import { ICertificateDocument } from '@src/model/category/degree/certificate.model';
import { IOrganizationDocument } from '@src/model/category/organization/organization.model';

export interface IInstructorCertificate extends Document {
  instructor: IInstructorDocument;
  certificate: ICertificateDocument;
  issueDate: Date;
  score: number;
  validityDuration: number;
  isVerified: boolean;
  verificationDate: Date;
  verificationNote: string;
  verifiedBy: IOrganizationDocument;
}

const instructorCertificateSchema = new mongoose.Schema<IInstructorCertificate>({
  instructor: { type: mongoose.Schema.ObjectId, ref: 'Instructor', required: true },
  certificate: { type: mongoose.Schema.ObjectId, ref: 'Certificate', required: true },
  issueDate: { type: Date, required: true },
  score: { type: Number, required: true },
  validityDuration: { type: Number, required: true, min: 0 },
  isVerified: { type: Boolean, default: false, required: false },
  verificationDate: { type: Date, required: false },
  verificationNote: { type: String, maxlength: 1022, default: '', required: false },
  verifiedBy: { type: mongoose.Schema.ObjectId, ref: 'Organization', required: false }
}, { timestamps: true });

const InstructorCertificate = mongoose.model<IInstructorCertificate>('InstructorCertificate',
  instructorCertificateSchema, 'instructors_certificates');
