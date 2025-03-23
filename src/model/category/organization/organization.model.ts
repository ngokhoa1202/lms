import mongoose, { Document } from 'mongoose';
import { ICity } from '@src/model/category/country/city.model';
import { OrganizationType } from '@src/constants/enum/organization/organizationType.enum';
import { v4 as uuidv4 } from 'uuid';

export interface IOrganization extends Document {
  _id: number;
  fullName: string;
  shortName: string;
  city: ICity;
  location: string;
  websiteURL: string;
  isActive: boolean;
  type: OrganizationType;
  emailSuffix: string;
}

const organizationSchema = new mongoose.Schema<IOrganization>({
  _id: { type: Number, required: true, index: true },
  fullName: { type: String, required: true, maxlength: 255 },
  shortName: { type: String, required: false, maxlength: 255 },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  location: { type: String, required: true, maxlength: 255 },
  websiteURL: { type: String, required: false, maxlength: 1022, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  type: { type: String, required: true, enum: Object.values(OrganizationType) },
  emailSuffix: { type: String, required: true, maxlength: 255, default: '@gmail.com' }
}, { timestamps: true, _id: false, versionKey: true, collection: 'universities' });


const Organization = mongoose.model<IOrganization>('University', organizationSchema, 'universities');
export default Organization;
