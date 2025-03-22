import mongoose from 'mongoose';
import Organization, { IOrganization } from '@src/model/category/organization/organization.model';
import { OrganizationType } from '@src/constants/enum/organization/organizationType.enum';

export interface ICorporation extends IOrganization {
  strengths: string[];
}

const coporationSchema = new mongoose.Schema<ICorporation>({
  strengths: { type: [String], required: false, maxlength: 1024 }
});

const Corporation = Organization.discriminator<ICorporation>(OrganizationType.CORPORATION, coporationSchema);
export default Corporation;
