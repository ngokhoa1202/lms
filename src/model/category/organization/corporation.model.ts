import { OrganizationType } from '@src/constants/enum/organization/organizationType.enum';
import Organization, { IOrganizationDocument } from '@src/model/category/organization/organization.model';
import mongoose from 'mongoose';

export interface ICorporation extends IOrganizationDocument {
  strengths: string[];
}

const corporationSchema = new mongoose.Schema<ICorporation>({
  strengths: { type: [String], required: false, maxlength: 1024 }
}, { collection: 'organizations' });

const Corporation = Organization.discriminator<ICorporation>(OrganizationType.CORPORATION, corporationSchema);
export default Corporation;
