import { OrganizationType } from '@src/constants/enum/organization/organizationType.enum';
import { ICityDocument } from '@src/model/category/country/city.model';
import mongoose, { Document } from 'mongoose';

export interface IOrganizationDocument extends Document {
  _id: string;
  fullName: string;
  shortName: string;
  city: ICityDocument;
  location: string;
  websiteURL: string;
  isActive: boolean;
  type: OrganizationType;
  emailSuffix: string;
}

const organizationSchema = new mongoose.Schema<IOrganizationDocument>({
  _id: { type: Number, required: true, index: true },
  fullName: { type: String, required: true, maxlength: 255 },
  shortName: { type: String, required: false, maxlength: 255 },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  location: { type: String, required: true, maxlength: 255 },
  websiteURL: { type: String, required: false, maxlength: 1022, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  type: { type: String, required: true, enum: Object.values(OrganizationType) },
  emailSuffix: { type: String, required: true, maxlength: 255, default: '@gmail.com' }
}, { timestamps: true, _id: true, versionKey: true, collection: 'organizations' });

export interface IOrganizationModel {
  _id: string;
  fullName: string;
  shortName: string;
  city: ICityDocument;
  location: string;
  websiteURL: string;
  isActive: boolean;
  type: OrganizationType;
  emailSuffix: string;
}

const Organization = mongoose.model<IOrganizationDocument>('Organization', organizationSchema, 'organizations');
export default Organization;
