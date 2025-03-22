import mongoose, { Document } from 'mongoose';
import { ICity } from '@src/model/category/country/city.model';
import Organization, { IOrganization } from '@src/model/category/organization/organization.model';
import { OrganizationType } from '@src/constants/enum/organization/organizationType.enum';

export interface IUniversity extends IOrganization {
  majors: string[];
}

const universitySchema = new mongoose.Schema<IUniversity>({
  majors: { type: [String], required: true, maxlength: 1024 }
}, { timestamps: true, _id: false, versionKey: true, collection: 'universities' });

const University = Organization.discriminator<IUniversity>(OrganizationType.UNIVERSITY, universitySchema);
export default University;
