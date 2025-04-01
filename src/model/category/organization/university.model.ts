import { OrganizationType } from '@src/constants/enum/organization/organizationType.enum';
import Organization, { IOrganizationDocument, IOrganizationModel } from '@src/model/category/organization/organization.model';
import mongoose from 'mongoose';

export interface IUniversityDocument extends IOrganizationDocument {
  majors: string[];
}

const universitySchema = new mongoose.Schema<IUniversityDocument>({
  majors: { type: [String], required: true, maxlength: 1024 }
}, { timestamps: true, _id: false, versionKey: true, collection: 'organizations' });

export interface IUniversityModel extends IOrganizationModel {
  majors: string[];
}

const University = Organization.discriminator<IUniversityDocument>(OrganizationType.UNIVERSITY, universitySchema);
export default University;
